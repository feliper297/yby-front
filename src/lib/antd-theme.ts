import type { ThemeConfig } from 'antd'

export const tupiTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890FF',
    colorLink: '#1890FF',
    colorLinkHover: '#40A9FF',
    colorSuccess: '#52C41A',
    colorWarning: '#FAAD14',
    colorError: '#FF4D4F',
    colorInfo: '#1890FF',
    colorBgBase: '#FFFFFF',
    colorBgLayout: '#F2F4F8',
    colorTextBase: 'rgba(0,0,0,0.85)',
    colorTextSecondary: 'rgba(0,0,0,0.65)',
    colorTextTertiary: 'rgba(0,0,0,0.45)',
    colorBorder: '#D9D9D9',
    colorSplit: '#F0F0F0',
    borderRadius: 2,
    borderRadiusSM: 2,
    borderRadiusLG: 4,
    fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
    fontSize: 14,
    lineHeight: 1.5714,
    sizeStep: 4,
    sizeUnit: 4,
    controlHeight: 32,
    controlHeightLG: 40,
    boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 6px rgba(0,0,0,0.02)',
    boxShadowSecondary: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  },
  components: {
    Button: {
      primaryColor: '#ffffff',
      borderRadius: 2,
      controlHeight: 32,
    },
    Table: {
      headerBg: '#FAFAFA',
      borderColor: '#F0F0F0',
      rowHoverBg: '#F5F5F5',
    },
    Tabs: {
      inkBarColor: '#1890FF',
      itemSelectedColor: '#1890FF',
      itemHoverColor: '#40A9FF',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: 'rgba(24,144,255,0.08)',
      itemSelectedColor: '#1890FF',
      itemHoverBg: 'rgba(0,0,0,0.04)',
    },
    Card: {
      borderRadius: 2,
    },
    Input: {
      borderRadius: 2,
    },
    Select: {
      borderRadius: 2,
    },
  },
}
