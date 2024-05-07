import React from 'react';
import { SvgIconProps } from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AcUnit as AcUnitIcon,
  Memory as MemoryIcon,
  Sensors as SensorsIcon,
  FlashOn as FlashOnIcon,
  Explore as ExploreIcon,
  CallMerge as CallMergeIcon,
  Wifi as WifiIcon,
  SettingsInputAntenna as SettingsInputAntennaIcon,
  MultipleStop as MultipleStopIcon,
  ViewHeadline as ViewHeadlineIcon,
  Description as DescriptionIcon,
  Keyboard as KeyboardIcon,
  WbTwilight as WbTwilightIcon,
  Security as SecurityIcon,
  Apps as AppsIcon,
  DoubleArrow as DoubleArrowIcon,
  ShoppingBasket as ShoppingBasketIcon,
  AddShoppingCart as AddShoppingCartIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  DeleteForever as DeleteForeverIcon,
  AttachMoney as AttachMoneyIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  Power as PowerIcon,
  SwitchLeft as SwitchLeftIcon,
  Handyman as HandymanIcon,
  Computer as ComputerIcon,
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon,
  Fluorescent as FluorescentIcon,
  Tv as TvIcon,
} from '@mui/icons-material';

import { ChipIcon, MeasuringTapeIcon, PcbIcon, ResistorIcon, ThreeDPrinterIcon } from '~/icons';

export const getIcon = (name: string, props: SvgIconProps = {}): any => {
  return {
    menu: <MenuIcon {...props} />,
    cpu: <MemoryIcon {...props} />,
    sensor: <SensorsIcon {...props} />,
    snow: <AcUnitIcon {...props} />,
    dashboard: <DashboardIcon {...props} />,
    flash: <FlashOnIcon {...props} />,
    compass: <ExploreIcon {...props} />,
    transistor: <CallMergeIcon {...props} />,
    wifi: <WifiIcon {...props} />,
    antenna: <SettingsInputAntennaIcon {...props} />,
    convertors: <MultipleStopIcon {...props} />,
    coil: <ViewHeadlineIcon {...props} />,
    document: <DescriptionIcon {...props} />,
    keyboard: <KeyboardIcon {...props} />,
    led: <WbTwilightIcon {...props} />,
    fuse: <SecurityIcon {...props} />,
    apps: <AppsIcon {...props} />,
    doubleArrow: <DoubleArrowIcon {...props} />,
    doubleArrowDown: <KeyboardDoubleArrowDownIcon {...props} />,
    shoppingBasket: <ShoppingBasketIcon {...props} />,
    addShoppingCart: <AddShoppingCartIcon {...props} />,
    chevronLeft: <ChevronLeftIcon {...props} />,
    chevronRight: <ChevronRightIcon {...props} />,
    deleteForever: <DeleteForeverIcon {...props} />,
    money: <AttachMoneyIcon {...props} />,
    navigateBefore: <NavigateBeforeIcon {...props} />,
    navigateNext: <NavigateNextIcon {...props} />,
    power: <PowerIcon {...props} />,
    switch: <SwitchLeftIcon {...props} />,
    tools: <HandymanIcon {...props} />,
    computer: <ComputerIcon {...props} />,
    star: <StarIcon {...props} />,
    starBorder: <StarBorderIcon {...props} />,
    starHalf: <StarHalfIcon {...props} />,
    fluorescent: <FluorescentIcon {...props} />,
    tv: <TvIcon {...props} />,
    resistor: <ResistorIcon {...props} />,
    measuringTape: <MeasuringTapeIcon {...props} />,
    pcb: <PcbIcon {...props} />,
    threeDPrinter: <ThreeDPrinterIcon {...props} />,
    chip: <ChipIcon {...props} />,
  }[name];
};
