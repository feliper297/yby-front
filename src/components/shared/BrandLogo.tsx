type BrandLogoProps = {
  brand: string
  size?: number
  showLabel?: boolean
}

// Card brand SVG logos — extracted from Figma DS (datatrans/payment-logos)
// All render in a 36×24 viewBox with a rounded-rect card background
const CARD_BRANDS: Record<string, React.ReactNode> = {
  Visa: (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* white card */}
      <path d="M34.8 0H1.2C.537 0 0 .537 0 1.2V22.8C0 23.463.537 24 1.2 24H34.8C35.463 24 36 23.463 36 22.8V1.2C36 .537 35.463 0 34.8 0Z" fill="white"/>
      {/* V — x=5.713 y=8.148 w=9.144 h=7.704 */}
      <svg x="5.713" y="8.148" width="9.144" height="7.704" viewBox="0 0 9.14286 7.7025">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.97911 0L5.06223 5.29764L4.83561 4.1568L4.83582 4.15722L4.15914.69372C4.15914.69372 4.07754 0 3.20544 0H.0369902L0 .13023C0 .13023.96918.33132 2.10282 1.01103L3.84951 7.7025H5.94423L9.14286 0H6.97911Z" fill="#182E66"/>
      </svg>
      {/* I — x=14.285 y=8.148 w=3.431 h=7.704 */}
      <svg x="14.285" y="8.148" width="3.431" height="7.704" viewBox="0 0 3.42858 7.7025">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.10978 7.7025H0L1.31859 0H3.42858L2.10978 7.7025Z" fill="#182E66"/>
      </svg>
      {/* S — x=17.716 y=8.148 w=5.713 h=7.704 */}
      <svg x="17.716" y="8.148" width="5.713" height="7.704" viewBox="0 0 5.71428 7.7025">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.4417 1.92258L5.71428.32445C5.71428.32445 4.8726 0 3.99516 0C3.04665 0 .79437.420389.79437 2.46339C.79437 4.386 3.43785 4.40988 3.43785 5.41923C3.43785 6.42861 1.06674 6.24828.28437 5.61153L0 7.28211C0 7.28211.85329 7.7025 2.15763 7.7025C3.46179 7.7025 5.42973 7.01757 5.42973 5.1549C5.42973 3.22017 2.76228 3.04005 2.76228 2.19888C2.76228 1.35771 4.62378 1.46577 5.4417 1.92258Z" fill="#182E66"/>
      </svg>
      {/* A — x=22.856 y=8.148 w=7.431 h=7.704 */}
      <svg x="22.856" y="8.148" width="7.431" height="7.704" viewBox="0 0 7.42848 7.7025">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 5.3325L4.24002 2.37L4.85715 5.3325H3.14286ZM7.42848 7.7025L5.88546 0H3.76437C3.04863 0 2.87457.57402 2.87457.57402L0 7.7025H2.00892L2.41095 6.55857H4.86129L5.08728 7.7025H7.42848Z" fill="#182E66"/>
      </svg>
      {/* decorative tail — x=5.713 y=8.148 w=4.572 h=4.147 */}
      <svg x="5.713" y="8.148" width="4.572" height="4.147" viewBox="0 0 4.57143 4.1475">
        <path fillRule="evenodd" clipRule="evenodd" d="M4.57143 4.1475L3.93174.6921C3.93174.6921 3.85461 0 3.03018 0H.0349503L0 .1299C0 .1299 1.43973.44421 2.82084 1.62081C4.14087 2.7456 4.57143 4.1475 4.57143 4.1475Z" fill="#182E66"/>
      </svg>
    </svg>
  ),

  Mastercard: (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* white card */}
      <path d="M34.8 0H1.2C.537 0 0 .537 0 1.2V22.8C0 23.463.537 24 1.2 24H34.8C35.463 24 36 23.463 36 22.8V1.2C36 .537 35.463 0 34.8 0Z" fill="white"/>
      {/* red circle — x=6.52 y=4.906 w=11.48 h=14.191 */}
      <svg x="6.52" y="4.906" width="11.48" height="14.191" viewBox="0 0 11.4802 14.1912">
        <path fillRule="evenodd" clipRule="evenodd" d="M8.77008 7.09569C8.77008 4.83216 9.82992 2.81622 11.4802 1.51692C10.2734.56688 8.75037 0 7.09512 0C3.17652 0 0 3.1767 0 7.09569C0 11.0145 3.17652 14.1912 7.09512 14.1912C8.75037 14.1912 10.2734 13.6243 11.4802 12.6743C9.82992 11.375 8.77008 9.35904 8.77008 7.09569Z" fill="#EB001B"/>
      </svg>
      {/* yellow circle — x=18 y=4.906 w=11.48 h=14.191 */}
      <svg x="18" y="4.906" width="11.48" height="14.191" viewBox="0 0 11.4802 14.1912">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.4802 7.09569C11.4802 11.0145 8.30373 14.1912 4.38513 14.1912C2.72988 14.1912 1.20687 13.6243 0 12.6743C1.65033 11.375 2.71017 9.35904 2.71017 7.09569C2.71017 4.83216 1.65033 2.81622 0 1.51692C1.20687.56688 2.72988 0 4.38513 0C8.30373 0 11.4802 3.1767 11.4802 7.09569Z" fill="#F79E1B"/>
      </svg>
      {/* orange overlap — x=14.897 y=6.422 w=6.206 h=11.156 */}
      <svg x="14.897" y="6.422" width="6.209" height="11.157" viewBox="0 0 6.20874 11.1572">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 11.1572H6.20874V0H0V11.1572Z" fill="#FF5F00"/>
      </svg>
      {/* MC text (tiny, bottom-right) — x=28.66 y=16.121 w=0.598 h=0.276 */}
      <svg x="28.66" y="16.121" width="0.598" height="0.276" viewBox="0 0 0.59781 0.27534">
        <path fillRule="evenodd" clipRule="evenodd" d="M.59781.27534V0H.52587L.44328.18942L.36051 0H.28857V.27534H.33942V.0675899L.416879.246751H.469498L.54717.0671997V.27534H.59781ZM.1425.27534V.0468899H.23457V.000390244H0V.0468899H.09207V.27534H.1425Z" fill="#F79E1B"/>
      </svg>
    </svg>
  ),

  Master: null, // alias — resolved below

  Elo: (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* black card */}
      <path d="M34.8 0H1.2C.537 0 0 .537 0 1.2V22.8C0 23.463.537 24 1.2 24H34.8C35.463 24 36 23.463 36 22.8V1.2C36 .537 35.463 0 34.8 0Z" fill="black"/>
      {/* top arc yellow — x=7.654 y=6.893 w=6.553 h=4.507 */}
      <svg x="7.654" y="6.893" width="6.553" height="4.507" viewBox="0 0 6.55341 4.506">
        <path fillRule="evenodd" clipRule="evenodd" d="M.65919 2.25612C.95529 2.15613 1.27203 2.10183 1.60164 2.10183C3.04002 2.10183 4.23984 3.13434 4.51509 4.506L6.55341 4.086C6.08571 1.75479 4.04667 0 1.60164 0C1.04184 0 .50301.0921595 0 .26193L.65919 2.25612Z" fill="#FFF200"/>
      </svg>
      {/* left arc blue — x=4.201 y=8.177 w=3.085 h=7.649 */}
      <svg x="4.201" y="8.177" width="3.085" height="7.649" viewBox="0 0 3.08334 7.64832">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.70523 7.64832L3.08334 6.0738C2.46819 5.52324 2.07993 4.71948 2.07993 3.82353C2.07993 2.92827 2.46783 2.12448 3.0828 1.57434L1.70397 0C.65871.9354 0 2.30172 0 3.82353C0 5.34612.65967 6.71295 1.70523 7.64832Z" fill="#00A4E0"/>
      </svg>
      {/* bottom arc red — x=7.650 y=12.602 w=6.554 h=4.505 */}
      <svg x="7.650" y="12.602" width="6.554" height="4.505" viewBox="0 0 6.55422 4.50315">
        <path fillRule="evenodd" clipRule="evenodd" d="M4.51629 0C4.24008 1.37055 3.04086 2.40114 1.60356 2.40114C1.27377 2.40114.95637 2.34672.66021 2.24646L0 4.24044C.50385 4.41093 1.04292 4.50315 1.60356 4.50315C4.04667 4.50315 6.0846 2.75064 6.55422.42183L4.51629 0Z" fill="#EF4123"/>
      </svg>
      {/* ELO wordmark white — x=16.639 y=8.182 w=15.16 h=7.637 */}
      <svg x="16.639" y="8.182" width="15.16" height="7.637" viewBox="0 0 15.1576 7.63655">
        <path fillRule="evenodd" clipRule="evenodd" d="M4.35086 5.83008C4.01426 6.16095 3.55784 6.36255 3.05387 6.35532C2.70845 6.34947 2.38838 6.24495 2.11625 6.0708L1.44161 7.15719C1.90364 7.45236 2.44844 7.62699 3.03575 7.6362C3.89069 7.64904 4.66991 7.30962 5.23649 6.74919L4.35086 5.83008ZM1.2782 4.713C1.27055 4.64082 1.26515 4.56681 1.26719 4.49211C1.28321 3.47838 2.10863 2.66949 3.11093 2.68629C3.65651 2.69367 4.14095 2.94615 4.46843 3.33693L1.2782 4.713ZM3.12932 1.40409C1.42808 1.37772.0260615 2.75118.000381507 4.4718C-.00954849 5.11665.174831 5.71962.499221 6.2208L6.08384 3.80856C5.76962 2.44908 4.57325 1.42698 3.12932 1.40409ZM7.83569 0V6.01671L8.8688 6.44949L8.38007 7.6362L7.35842 7.20702C7.12871 7.10634 6.97325 6.95295 6.85511 6.7797C6.74171 6.60246 6.65762 6.36018 6.65762 6.03327V0H7.83569ZM11.56 2.78043C11.7407 2.71914 11.9341 2.68626 12.1353 2.68626C13.0133 2.68626 13.7455 3.31632 13.9132 4.15377L15.1576 3.89739C14.8723 2.47443 13.6276 1.40325 12.1353 1.40325C11.7934 1.40325 11.4648 1.4595 11.158 1.56303L11.56 2.78043ZM10.0922 6.85428L10.933 5.89332C10.5575 5.55732 10.321 5.06658 10.321 4.51962C10.321 3.9732 10.5575 3.4827 10.9327 3.14694L10.0912 2.18601C9.45332 2.75697 9.05141 3.59124 9.05141 4.51962C9.05141 5.44917 9.45362 6.28314 10.0922 6.85428ZM13.9132 4.8879C13.7446 5.72412 13.0125 6.35364 12.1353 6.35364C11.9339 6.35364 11.7404 6.32022 11.5594 6.25911L11.1565 7.47606C11.4641 7.5801 11.7931 7.63653 12.1353 7.63653C13.6261 7.63653 14.8705 6.56679 15.1573 5.14536L13.9132 4.8879Z" fill="white"/>
      </svg>
    </svg>
  ),

  Amex: (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* blue card */}
      <path d="M34.8 0H1.2C.537 0 0 .537 0 1.2V22.8C0 23.463.537 24 1.2 24H34.8C35.463 24 36 23.463 36 22.8V1.2C36 .537 35.463 0 34.8 0Z" fill="#0690FF"/>
      {/* AMEX logo details (right 2/3) */}
      <svg x="12" y="0" width="24" height="24" viewBox="0 0 24 24">
        <path d="M22.8 0H1.2C.537 0 0 .537 0 1.2V22.8C0 23.463.537 24 1.2 24H22.8C23.463 24 24 23.463 24 22.8V1.2C24 .537 23.463 0 22.8 0Z" fill="white"/>
        <path d="M24 24V20.1971H21.1047L19.614 18.5488L18.1158 20.1971H8.56929V12.5149H5.48814L9.30999 3.86562H12.9958L14.3115 6.82872V3.86562H18.8739L19.6659 6.09849L20.4633 3.86562H24V0H0V24H24ZM21.5922 19.2353H24L20.8152 15.8578L24 12.5187H21.6306L19.6638 14.6681L17.7158 12.5187H15.3075L18.4737 15.877L15.3075 19.2353H17.6487L19.6254 17.0668L21.5922 19.2353ZM22.1556 15.8606L24 17.8228V13.9148L22.1556 15.8606ZM11.4215 17.6809V16.635H15.2114V15.119H11.4215V14.0732H15.3074L15.3075 12.5187H9.58878V19.2353H15.3075L15.3074 17.6809H11.4215ZM22.1865 11.5441H24V4.82751H21.1791L19.6725 9.01086L18.1758 4.82751H15.3069V11.5441H17.1202V6.84249L18.8475 11.5441H20.4594L22.1865 6.8328V11.5441ZM13.2439 11.5441H15.3069L12.3422 4.82751H9.98169L7.0167 11.5441H9.03168L9.5883 10.2008H12.6778L13.2439 11.5441ZM12.0446 8.6943H10.2215L11.1331 6.49704L12.0446 8.6943Z" fill="#0690FF"/>
      </svg>
    </svg>
  ),
}

// Resolve Master alias
CARD_BRANDS['Master'] = CARD_BRANDS['Mastercard']

// Acquirer logos from Figma DS — stored as PNG (no vector version available in DS)
const ACQUIRER_LOGOS: Record<string, string> = {
  Adiq:   '/brands/adiq.png',
  Rede:   '/brands/rede.png',
  Cielo:  '/brands/cielo.png',
  Getnet: '/brands/getnet.png',
}

export default function BrandLogo({ brand, size = 20, showLabel = false }: BrandLogoProps) {
  const h = size
  const w = Math.round(size * 1.6)

  // Card brand — inline SVG
  const cardSvg = CARD_BRANDS[brand]
  if (cardSvg !== undefined) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: w, height: h,
          background: '#fff',
          border: '1px solid #D9D9D9',
          borderRadius: 3, overflow: 'hidden', flexShrink: 0,
        }}>
          <span style={{ display: 'flex', width: '90%', height: '90%' }}>{cardSvg}</span>
        </span>
        {showLabel && <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>{brand}</span>}
      </span>
    )
  }

  // Acquirer — PNG from DS
  const acqSrc = ACQUIRER_LOGOS[brand]
  if (acqSrc) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: w, height: h,
          background: '#fff',
          border: '1px solid #D9D9D9',
          borderRadius: 3, overflow: 'hidden', flexShrink: 0, padding: 2,
        }}>
          <img
            src={acqSrc}
            alt={brand}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
          />
        </span>
        {showLabel && <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>{brand}</span>}
      </span>
    )
  }

  // Fallback — plain text
  return <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)', fontWeight: 500 }}>{brand}</span>
}
