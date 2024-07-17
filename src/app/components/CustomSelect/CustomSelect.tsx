/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, memo} from 'react';
import {Platform, Keyboard, View} from 'react-native';
import {useFocusRing} from '@react-native-aria/focus';
import {useHover} from '@react-native-aria/interactions';
import {mergeRefs} from 'native-base/src/utils';
import {
  Actionsheet,
  Box,
  ChevronDownIcon,
  IButtonProps,
  Input,
  Pressable,
  ScrollView,
  useControllableState,
  usePropsResolution,
} from 'native-base';
import {extractInObject, stylingProps} from 'native-base/src/theme/tools';
import {useHasResponsiveProps} from 'native-base/src/hooks/useHasResponsiveProps';
import {useFormControl} from 'native-base/src/components/composites/FormControl';
import {IMoiSelectItemProps, IMoiSelectProps} from '.';

export const SelectContext = React.createContext({
  onValueChange: (() => {}) as any,
  selectedValue: null as any,
  _selectedItem: {} as IButtonProps,
  _item: {} as IButtonProps,
});

const Select = (
  {
    isHovered: isHoveredProp,
    isFocused: isFocusedProp,
    isFocusVisible: isFocusVisibleProp,
    variant,
    leftIcon,
    ...props
  }: IMoiSelectProps,
  ref: any,
) => {
  const selectProps = useFormControl({
    isDisabled: props.isDisabled,
    nativeID: props.nativeID,
  });
  const flatListData: IMoiSelectItemProps[] = [];

  const isDisabled = selectProps.disabled;
  const tempFix = '__NativebasePlaceholder__';
  const _ref = React.useRef(null);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const {focusProps, isFocusVisible} = useFocusRing();
  const {hoverProps, isHovered} = useHover({isDisabled}, _ref);

  const {
    onValueChange,
    selectedValue,
    children,
    dropdownIcon,
    dropdownCloseIcon,
    dropdownOpenIcon,
    placeholder,
    accessibilityLabel,
    defaultValue,
    _item,
    _selectedItem,
    onOpen,
    onClose,
    optimized,
    customDropdownIconProps,
    _actionSheet,
    _actionSheetContent,
    _actionSheetBody,
    _webSelect,
    ...resolvedProps
  } = usePropsResolution(
    'Select',
    props,
    {
      isDisabled,
      isHovered: isHoveredProp || isHovered,
      isFocused: isFocusedProp || isFocused,
      isFocusVisible: isFocusVisibleProp || isFocusVisible,
    },
    undefined,
  );

  const [value, setValue] = useControllableState({
    value: selectedValue,
    defaultValue,
    onChange: newValue => {
      onValueChange && onValueChange(newValue);
      setIsOpen(false);
    },
  });

  const itemsList: Array<{
    label: string;
    value: string;
  }> = React.Children.toArray(children).map((child: any) => {
    return {
      label: child?.props?.label,
      value: child?.props?.value,
    };
  });

  const selectedItemArray = itemsList.filter(
    (item: any) => item?.value === value,
  );

  const selectedItem =
    selectedItemArray && selectedItemArray.length ? selectedItemArray[0] : null;

  const contextValue = React.useMemo(() => {
    return {
      onValueChange: setValue,
      selectedValue: value,
      _selectedItem: _selectedItem ?? {},
      _item: _item ?? {},
    };
  }, [value, setValue, _selectedItem, _item]);

  //TODO: refactor for responsive prop
  if (useHasResponsiveProps(props)) {
    return null;
  }

  const rightIcon =
    isOpen && dropdownOpenIcon ? (
      dropdownOpenIcon
    ) : !isOpen && dropdownCloseIcon ? (
      dropdownCloseIcon
    ) : dropdownIcon ? (
      dropdownIcon
    ) : (
      <ChevronDownIcon {...customDropdownIconProps} />
    );

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  if (optimized) {
    React.Children.toArray(children).map((child: any) => {
      flatListData.push(child.props);
    });
  }

  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [
    ...stylingProps.margin,
    ...stylingProps.flexbox,
    ...stylingProps.position,
    'shadow',
    'opacity',
  ]);

  const leftIconComponent = <View style={{paddingLeft: 10}}>{leftIcon}</View>;

  const commonInput = (
    <Input
      placeholder={placeholder}
      InputRightElement={rightIcon}
      InputLeftElement={leftIconComponent}
      {...nonLayoutProps}
      // NOTE: Adding ts-ignore as we're not exposing isFocused in the Input component
      // @ts-ignore-next-line
      isFocused={isFocused}
      isHovered={isHovered}
      aria-hidden={true}
      importantForAccessibility="no"
      value={selectedItem ? selectedItem.label : ''}
      editable={false}
      focusable={false}
      isDisabled={isDisabled}
      pointerEvents="none"
      variant={variant}
    />
  );

  return Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          setIsOpen(true);
          onOpen && onOpen();
        }}
        disabled={isDisabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        ref={mergeRefs([ref, _ref])}
        {...layoutProps}>
        {commonInput}
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={handleClose} {..._actionSheet}>
        <Actionsheet.Content {..._actionSheetContent}>
          {optimized ? (
            <ScrollView
              {..._actionSheetBody}
              data={flatListData}
              // eslint-disable-next-line no-shadow
              keyExtractor={(_: any, index: any) => index.toString()}
              renderItem={({item}: any) => {
                const isSelected = selectedValue === item?.value;
                return (
                  <Actionsheet.Item
                    onPress={() => {
                      if (!isDisabled) {
                        setValue(item?.value);
                      }
                    }}
                    accessibilityState={{selected: isSelected}}
                    {...item}
                    {..._item}
                    {...(isSelected && _selectedItem)}>
                    {item?.label}
                  </Actionsheet.Item>
                );
              }}
            />
          ) : (
            <ScrollView {..._actionSheetBody}>
              <SelectContext.Provider value={contextValue}>
                {children}
              </SelectContext.Provider>
            </ScrollView>
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  ) : (
    <Box {...layoutProps}>
      <select
        aria-readonly={selectProps.readOnly}
        required={selectProps.required}
        disabled={isDisabled}
        {...focusProps}
        {...hoverProps}
        ref={mergeRefs([ref, _ref])}
        //@ts-ignore
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
        value={selectedItem === null ? tempFix : value}
        aria-label={placeholder}
        onFocus={() => {
          setIsFocused(true);
          onOpen && onOpen();
        }}
        onBlur={() => {
          setIsFocused(false);
          onClose && onClose();
        }}
        {..._webSelect}>
        <option disabled value={tempFix}>
          {placeholder}
        </option>
        {children}
      </select>
      {commonInput}
    </Box>
  );
};

export default memo(forwardRef(Select));
