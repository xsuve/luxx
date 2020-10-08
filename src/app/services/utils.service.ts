import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  companyIndustries = [
    { name: 'Information Technology (IT)', value: 'Information Technology (IT)' }
  ];
  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');

  formatterInvoiceNumber = (value: number) => `# ${value}`;
  parserInvoiceNumber = (value: string) => value.replace('# ', '');

  constructor() { }

  // Format Initials
  formatInitials(string) {
    let initials = string.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }

  // Contact Stage Color
  contactStageColor(stage) {
    switch(stage) {
      case 'prospecting':
        return 'bg-yellow-light text-yellow';
      break;
      case 'securing-lead':
        return 'bg-orange-light text-orange';
      break;
      case 'pitching-solution':
        return 'bg-red-light text-red';
      break;
      case 'qualifying-deals':
        return 'bg-purple-light text-purple';
      break;
      case 'sending-proposal':
        return 'bg-blue-light text-blue';
      break;
      case 'deal-negotiation':
        return 'bg-cyan-light text-cyan';
      break;
      case 'closure':
        return 'bg-green-light text-green';
      break;
      default:
        return 'bg-gray-light text-gray';
      break;
    }
  }

  // Contact Stage Name
  contactStageName(stage) {
    switch(stage) {
      case 'prospecting':
        return 'Prospecting';
      break;
      case 'securing-lead':
        return 'Securing Lead';
      break;
      case 'pitching-solution':
        return 'Pitching Solution';
      break;
      case 'qualifying-deals':
        return 'Qualifying Deals';
      break;
      case 'sending-proposal':
        return 'Sending Proposal';
      break;
      case 'deal-negotiation':
        return 'Deal Negotiation';
      break;
      case 'closure':
        return 'Closure';
      break;
      default:
        return 'Stage';
      break;
    }
  }

  // Event Type Color
  eventTypeColor(type) {
    switch(type) {
      case 'meeting':
        return '#f5222d';
      break;
      case 'call':
        return '#52c41a';
      break;
      case 'reminder':
        return '#fa8c16';
      break;
      case 'other':
        return '#bfbfbf';
      break;
      default:
        return '#1479ff';
      break;
    }
  }

  countries = [
    { label: 'Afghanistan', iso: 'AF', value: 'AF', flag: 'AF.png' },
    // { label: 'Åland Islands', iso: 'AX', value: 'AX', flag: 'AX.png' },
    { label: 'Albania', iso: 'AL', value: 'AL', flag: 'AL.png' },
    { label: 'Algeria', iso: 'DZ', value: 'DZ', flag: 'DZ.png' },
    // { label: 'American Samoa', iso: 'AS', value: 'AS', flag: 'AS.png' },
    { label: 'Andorra', iso: 'AD', value: 'AD', flag: 'AD.png' },
    // { label: 'Angola', iso: 'AO', value: 'AO', flag: 'AO.png' },
    // { label: 'Anguilla', iso: 'AI', value: 'AI', flag: 'AI.png' },
    // { label: 'Antarctica', iso: 'AQ', value: 'AQ', flag: 'AQ.png' },
    { label: 'Antigua and Barbuda', iso: 'AG', value: 'AG', flag: 'AG.png' },
    { label: 'Argentina', iso: 'AR', value: 'AR', flag: 'AR.png' },
    { label: 'Armenia', iso: 'AM', value: 'AM', flag: 'AM.png' },
    // { label: 'Aruba', iso: 'AW', value: 'AW', flag: 'AW.png' },
    { label: 'Australia', iso: 'AU', value: 'AU', flag: 'AU.png' },
    { label: 'Austria', iso: 'AT', value: 'AT', flag: 'AT.png' },
    { label: 'Azerbaijan', iso: 'AZ', value: 'AZ', flag: 'AZ.png' },
    { label: 'Bahamas', iso: 'BS', value: 'BS', flag: 'BS.png' },
    { label: 'Bahrain', iso: 'BH', value: 'BH', flag: 'BH.png' },
    { label: 'Bangladesh', iso: 'BD', value: 'BD', flag: 'BD.png' },
    { label: 'Barbados', iso: 'BB', value: 'BB', flag: 'BB.png' },
    { label: 'Belarus', iso: 'BY', value: 'BY', flag: 'BY.png' },
    { label: 'Belgium', iso: 'BE', value: 'BE', flag: 'BE.png' },
    { label: 'Belize', iso: 'BZ', value: 'BZ', flag: 'BZ.png' },
    { label: 'Benin', iso: 'BJ', value: 'BJ', flag: 'BJ.png' },
    // { label: 'Bermuda', iso: 'BM', value: 'BM', flag: 'BM.png' },
    { label: 'Bhutan', iso: 'BT', value: 'BT', flag: 'BT.png' },
    { label: 'Bolivia', iso: 'BO', value: 'BO', flag: 'BO.png' },
    // { label: 'Bonaire, Sint Eustatius and Saba', iso: 'BQ', value: 'BQ', flag: 'BQ.png' },
    { label: 'Bosnia and Herzegovina', iso: 'BA', value: 'BA', flag: 'BA.png' },
    { label: 'Botswana', iso: 'BW', value: 'BW', flag: 'BW.png' },
    // { label: 'Bouvet Island', iso: 'BV', value: 'BV', flag: 'BV.png' },
    { label: 'Brazil', iso: 'BR', value: 'BR', flag: 'BR.png' },
    // { label: 'British Indian Ocean Territory', iso: 'IO', value: 'IO', flag: 'IO.png' },
    { label: 'Brunei Darussalam', iso: 'BN', value: 'BN', flag: 'BN.png' },
    { label: 'Bulgaria', iso: 'BG', value: 'BG', flag: 'BG.png' },
    { label: 'Burkina Faso', iso: 'BF', value: 'BF', flag: 'BF.png' },
    { label: 'Burundi', iso: 'BI', value: 'BI', flag: 'BI.png' },
    { label: 'Cambodia', iso: 'CH', value: 'CH', flag: 'CH.png' },
    { label: 'Cameroon', iso: 'CM', value: 'CM', flag: 'CM.png' },
    { label: 'Canada', iso: 'CA', value: 'CA', flag: 'CA.png' },
    { label: 'Cape Verde', iso: 'CV', value: 'CV', flag: 'CV.png' },
    // { label: 'Cayman Islands', iso: 'KY', value: 'KY', flag: 'KY.png' },
    { label: 'Central African Republic', iso: 'CF', value: 'CF', flag: 'CF.png' },
    { label: 'Chad', iso: 'TD', value: 'TD', flag: 'TD.png' },
    { label: 'Chile', iso: 'CL', value: 'CL', flag: 'CL.png' },
    { label: 'China', iso: 'CN', value: 'CN', flag: 'CN.png' },
    // { label: 'Christmas Island', iso: 'CX', value: 'CX', flag: 'CX.png' },
    // { label: 'Cocos Islands', iso: 'CC', value: 'CC', flag: 'CC.png' },
    { label: 'Colombia', iso: 'CO', value: 'CO', flag: 'CO.png' },
    { label: 'Comoros', iso: 'KM', value: 'KM', flag: 'KM.png' },
    { label: 'Congo', iso: 'CG', value: 'CG', flag: 'CG.png' },
    { label: 'Democratic Republic of Congo', iso: 'CD', value: 'CD', flag: 'CD.png' },
    // { label: 'Cook Islands', iso: 'CK', value: 'CK', flag: 'CK.png' },
    { label: 'Costa Rica', iso: 'CR', value: 'CR', flag: 'CR.png' },
    { label: "Côte d'Ivoire", iso: 'CI', value: 'CI', flag: 'CI.png' },
    { label: 'Croatia', iso: 'HR', value: 'HR', flag: 'HR.png' },
    { label: 'Cuba', iso: 'CU', value: 'CU', flag: 'CU.png' },
    // { label: 'Curaçao', iso: 'CW', value: 'CW', flag: 'CW.png' },
    { label: 'Cyprus', iso: 'CY', value: 'CY', flag: 'CY.png' },
    { label: 'Czech Republic', iso: 'CZ', value: 'CZ', flag: 'CZ.png' },
    { label: 'Denmark', iso: 'DK', value: 'DK', flag: 'DK.png' },
    { label: 'Djibouti', iso: 'DJ', value: 'DJ', flag: 'DJ.png' },
    { label: 'Dominica', iso: 'DM', value: 'DM', flag: 'DM.png' },
    { label: 'Dominican Republic', iso: 'DO', value: 'DO', flag: 'DO.png' },
    { label: 'Ecuador', iso: 'EC', value: 'EC', flag: 'EC.png' },
    { label: 'Egypt', iso: 'EG', value: 'EG', flag: 'EG.png' },
    { label: 'El Salvador', iso: 'SV', value: 'SV', flag: 'SV.png' },
    { label: 'Equatorial Guinea', iso: 'GQ', value: 'GQ', flag: 'GQ.png' },
    { label: 'Eritrea', iso: 'ER', value: 'ER', flag: 'ER.png' },
    { label: 'Estonia', iso: 'EE', value: 'EE', flag: 'EE.png' },
    { label: 'Ethiopia', iso: 'ET', value: 'ET', flag: 'ET.png' },
    // { label: 'Falkland Islands', iso: 'FK', value: 'FK', flag: 'FK.png' },
    // { label: 'Faroe Islands', iso: 'FO', value: 'FO', flag: 'FO.png' },
    { label: 'Fiji', iso: 'FJ', value: 'FJ', flag: 'FJ.png' },
    { label: 'Finland', iso: 'FI', value: 'FI', flag: 'FI.png' },
    { label: 'France', iso: 'FR', value: 'FR', flag: 'FR.png' },
    // { label: 'French Guiana', iso: 'GF', value: 'GF', flag: 'GF.png' },
    // { label: 'French Polynesia', iso: 'PF', value: 'PF', flag: 'PF.png' },
    // { label: 'French Southern Territories', iso: 'TF', value: 'TF', flag: 'TF.png' },
    { label: 'Gabon', iso: 'GA', value: 'GA', flag: 'GA.png' },
    { label: 'Gambia', iso: 'GM', value: 'GM', flag: 'GM.png' },
    { label: 'Georgia', iso: 'GE', value: 'GE', flag: 'GE.png' },
    { label: 'Germany', iso: 'DE', value: 'DE', flag: 'DE.png' },
    { label: 'Ghana', iso: 'GH', value: 'GH', flag: 'GH.png' },
    // { label: 'Gibraltar', iso: 'GI', value: 'GI', flag: 'GI.png' },
    { label: 'Greece', iso: 'GR', value: 'GR', flag: 'GR.png' },
    // { label: 'Greenland', iso: 'GL', value: 'GL', flag: 'GL.png' },
    { label: 'Grenada', iso: 'GD', value: 'GD', flag: 'GD.png' },
    // { label: 'Guadeloupe', iso: 'GP', value: 'GP', flag: 'GP.png' },
    // { label: 'Guam', iso: 'GU', value: 'GU', flag: 'GU.png' },
    { label: 'Guatemala', iso: 'GT', value: 'GT', flag: 'GT.png' },
    // { label: 'Guernsey', iso: 'GG', value: 'GG', flag: 'GG.png' },
    { label: 'Guinea', iso: 'GN', value: 'GN', flag: 'GN.png' },
    { label: 'Guinea-Bissau', iso: 'GW', value: 'GW', flag: 'GW.png' },
    { label: 'Guyana', iso: 'GY', value: 'GY', flag: 'GY.png' },
    { label: 'Haiti', iso: 'HT', value: 'HT', flag: 'HT.png' },
    // { label: 'Heard Island and McDonald Islands', iso: 'HM', value: 'HM', flag: 'HM.png' },
    { label: 'Vatican', iso: 'VA', value: 'VA', flag: 'VA.png' },
    { label: 'Honduras', iso: 'HN', value: 'HN', flag: 'HN.png' },
    // { label: 'Hong Kong', iso: 'HK', value: 'HK', flag: 'HK.png' },
    { label: 'Hungary', iso: 'HU', value: 'HU', flag: 'HU.png' },
    { label: 'Iceland', iso: 'IS', value: 'IS', flag: 'IS.png' },
    { label: 'India', iso: 'IN', value: 'IN', flag: 'IN.png' },
    { label: 'Indonesia', iso: 'ID', value: 'ID', flag: 'ID.png' },
    { label: 'Iran', iso: 'IR', value: 'IR', flag: 'IR.png' },
    { label: 'Iraq', iso: 'IQ', value: 'IQ', flag: 'IQ.png' },
    { label: 'Ireland', iso: 'IE', value: 'IE', flag: 'IE.png' },
    // { label: 'Isle of Man', iso: 'IM', value: 'IM', flag: 'IM.png' },
    { label: 'Israel', iso: 'IL', value: 'IL', flag: 'IL.png' },
    { label: 'Italy', iso: 'IT', value: 'IT', flag: 'IT.png' },
    { label: 'Jamaica', iso: 'JM', value: 'JM', flag: 'JM.png' },
    { label: 'Japan', iso: 'JP', value: 'JP', flag: 'JP.png' },
    // { label: 'Jersey', iso: 'JE', value: 'JE', flag: 'JE.png' },
    { label: 'Jordan', iso: 'JO', value: 'JO', flag: 'JO.png' },
    { label: 'Kazakhstan', iso: 'KZ', value: 'KZ', flag: 'KZ.png' },
    { label: 'Kenya', iso: 'KE', value: 'KE', flag: 'KE.png' },
    { label: 'Kiribati', iso: 'KI', value: 'KI', flag: 'KI.png' },
    { label: "Democratic People's Republic of Korea", iso: 'KP', value: 'KP', flag: 'KP.png' },
    { label: 'Korea', iso: 'KR', value: 'KR', flag: 'KR.png' },
    { label: 'Kuwait', iso: 'KW', value: 'KW', flag: 'KW.png' },
    { label: 'Kyrgyzstan', iso: 'KG', value: 'KG', flag: 'KG.png' },
    { label: "Lao People's Democratic Republic", iso: 'LA', value: 'LA', flag: 'LA.png' },
    { label: 'Latvia', iso: 'LV', value: 'LV', flag: 'LV.png' },
    { label: 'Lebanon', iso: 'LB', value: 'LB', flag: 'LB.png' },
    { label: 'Lesotho', iso: 'LS', value: 'LS', flag: 'LS.png' },
    { label: 'Liberia', iso: 'LR', value: 'LR', flag: 'LR.png' },
    { label: 'Libya', iso: 'LY', value: 'LY', flag: 'LY.png' },
    { label: 'Liechtenstein', iso: 'LI', value: 'LI', flag: 'LI.png' },
    { label: 'Lithuania', iso: 'LT', value: 'LT', flag: 'LT.png' },
    { label: 'Luxembourg', iso: 'LU', value: 'LU', flag: 'LU.png' },
    // { label: 'Macao', iso: 'MO', value: 'MO', flag: 'MO.png' },
    { label: 'Macedonia', iso: 'MK', value: 'MK', flag: 'MK.png' },
    { label: 'Madagascar', iso: 'MG', value: 'MG', flag: 'MG.png' },
    { label: 'Malawi', iso: 'MW', value: 'MW', flag: 'MW.png' },
    { label: 'Malaysia', iso: 'MY', value: 'MY', flag: 'MY.png' },
    { label: 'Maldives', iso: 'MV', value: 'MV', flag: 'MV.png' },
    { label: 'Mali', iso: 'ML', value: 'ML', flag: 'ML.png' },
    { label: 'Malta', iso: 'MT', value: 'MT', flag: 'MT.png' },
    { label: 'Marshall Islands', iso: 'MH', value: 'MH', flag: 'MH.png' },
    // { label: 'Martinique', iso: 'MQ', value: 'MQ', flag: 'MQ.png' },
    { label: 'Mauritania', iso: 'MR', value: 'MR', flag: 'MR.png' },
    { label: 'Mauritius', iso: 'MU', value: 'MU', flag: 'MU.png' },
    // { label: 'Mayotte', iso: 'YT', value: 'YT', flag: 'YT.png' },
    { label: 'Mexico', iso: 'MX', value: 'MX', flag: 'MX.png' },
    { label: 'Micronesia', iso: 'FM', value: 'FM', flag: 'FM.png' },
    { label: 'Moldova', iso: 'MD', value: 'MD', flag: 'MD.png' },
    { label: 'Monaco', iso: 'MC', value: 'MC', flag: 'MC.png' },
    { label: 'Mongolia', iso: 'MN', value: 'MN', flag: 'MN.png' },
    { label: 'Montenegro', iso: 'ME', value: 'ME', flag: 'ME.png' },
    // { label: 'Montserrat', iso: 'MS', value: 'MS', flag: 'MS.png' },
    { label: 'Morocco', iso: 'MA', value: 'MA', flag: 'MA.png' },
    { label: 'Mozambique', iso: 'MZ', value: 'MZ', flag: 'MZ.png' },
    { label: 'Myanmar', iso: 'MM', value: 'MM', flag: 'MM.png' },
    { label: 'Namibia', iso: 'NA', value: 'NA', flag: 'NA.png' },
    { label: 'Nauru', iso: 'NR', value: 'NR', flag: 'NR.png' },
    { label: 'Nepal', iso: 'NP', value: 'NP', flag: 'NP.png' },
    { label: 'Netherlands', iso: 'NL', value: 'NL', flag: 'NL.png' },
    // { label: 'New Caledonia', iso: 'NC', value: 'NC', flag: 'NC.png' },
    { label: 'New Zealand', iso: 'NZ', value: 'NZ', flag: 'NZ.png' },
    { label: 'Nicaragua', iso: 'NI', value: 'NI', flag: 'NI.png' },
    { label: 'Niger', iso: 'NE', value: 'NE', flag: 'NE.png' },
    { label: 'Nigeria', iso: 'NG', value: 'NG', flag: 'NG.png' },
    // { label: 'Niue', iso: 'NU', value: 'NU', flag: 'NU.png' },
    // { label: 'Norfolk Island', iso: 'NF', value: 'NF', flag: 'NF.png' },
    // { label: 'Northern Mariana Islands', iso: 'MP', value: 'MP', flag: 'MP.png' },
    { label: 'Norway', iso: 'NO', value: 'NO', flag: 'NO.png' },
    { label: 'Oman', iso: 'OM', value: 'OM', flag: 'OM.png' },
    { label: 'Pakistan', iso: 'PK', value: 'PK', flag: 'PK.png' },
    { label: 'Palau', iso: 'PW', value: 'PW', flag: 'PW.png' },
    // { label: 'Palestinia', iso: 'PS', value: 'PS', flag: 'PS.png' },
    { label: 'Panama', iso: 'PA', value: 'PA', flag: 'PA.png' },
    { label: 'Papua New Guinea', iso: 'PG', value: 'PG', flag: 'PG.png' },
    { label: 'Paraguay', iso: 'PY', value: 'PY', flag: 'PY.png' },
    { label: 'Peru', iso: 'PE', value: 'PE', flag: 'PE.png' },
    { label: 'Philippines', iso: 'PH', value: 'PH', flag: 'PH.png' },
    // { label: 'Pitcairn', iso: 'PN', value: 'PN', flag: 'PN.png' },
    { label: 'Poland', iso: 'PL', value: 'PL', flag: 'PL.png' },
    { label: 'Portugal', iso: 'PT', value: 'PT', flag: 'PT.png' },
    // { label: 'Puerto Rico', iso: 'PR', value: 'PR', flag: 'PR.png' },
    { label: 'Qatar', iso: 'QA', value: 'QA', flag: 'QA.png' },
    // { label: 'Réunion', iso: 'RE', value: 'RE', flag: 'RE.png' },
    { label: 'Romania', iso: 'RO', value: 'RO', flag: 'RO.png' },
    { label: 'Russia', iso: 'RU', value: 'RU', flag: 'RU.png' },
    { label: 'Rwanda', iso: 'RW', value: 'RW', flag: 'RW.png' },
    // { label: 'Saint Barthélemy', iso: 'BL', value: 'BL', flag: 'BL.png' },
    // { label: 'Saint Helena, Ascension and Tristan da Cunha', iso: 'SH', value: 'SH', flag: 'SH.png' },
    { label: 'Saint Kitts and Nevis', iso: 'KN', value: 'KN', flag: 'KN.png' },
    { label: 'Saint Lucia', iso: 'LC', value: 'LC', flag: 'LC.png' },
    // { label: 'Saint Martin', iso: 'MF', value: 'MF', flag: 'MF.png' },
    // { label: 'Saint Pierre and Miquelon', iso: 'PM', value: 'PM', flag: 'PM.png' },
    { label: 'Saint Vincent and the Grenadines', iso: 'VC', value: 'VC', flag: 'VC.png' },
    { label: 'Samoa', iso: 'WS', value: 'WS', flag: 'WS.png' },
    { label: 'San Marino', iso: 'SM', value: 'SM', flag: 'SM.png' },
    { label: 'Sao Tome and Principe', iso: 'ST', value: 'ST', flag: 'ST.png' },
    { label: 'Saudi Arabia', iso: 'SA', value: 'SA', flag: 'SA.png' },
    { label: 'Senegal', iso: 'SN', value: 'SN', flag: 'SN.png' },
    { label: 'Serbia', iso: 'RS', value: 'RS', flag: 'RS.png' },
    { label: 'Seychelles', iso: 'SC', value: 'SC', flag: 'SC.png' },
    { label: 'Sierra Leone', iso: 'SL', value: 'SL', flag: 'SL.png' },
    { label: 'Singapore', iso: 'SG', value: 'SG', flag: 'SG.png' },
    // { label: 'Sint Maarten', iso: 'SX', value: 'SX', flag: 'SX.png' },
    { label: 'Slovakia', iso: 'SK', value: 'SK', flag: 'SK.png' },
    { label: 'Slovenia', iso: 'SI', value: 'SI', flag: 'SI.png' },
    { label: 'Solomon Islands', iso: 'SB', value: 'SB', flag: 'SB.png' },
    { label: 'Somalia', iso: 'SO', value: 'SO', flag: 'SO.png' },
    { label: 'South Africa', iso: 'ZA', value: 'ZA', flag: 'ZA.png' },
    // { label: 'South Georgia and the South Sandwich Islands', iso: 'GS', value: 'GS', flag: 'GS.png' },
    { label: 'South Sudan', iso: 'SS', value: 'SS', flag: 'SS.png' },
    { label: 'Spain', iso: 'ES', value: 'ES', flag: 'ES.png' },
    { label: 'Sri Lanka', iso: 'LK', value: 'LK', flag: 'LK.png' },
    { label: 'Sudan', iso: 'SD', value: 'SD', flag: 'SD.png' },
    { label: 'Suriname', iso: 'SR', value: 'SR', flag: 'SR.png' },
    // { label: 'Svalbard and Jan Mayen', iso: 'SJ', value: 'SJ', flag: 'SJ.png' },
    { label: 'Swaziland', iso: 'SZ', value: 'SZ', flag: 'SZ.png' },
    { label: 'Sweden', iso: 'SE', value: 'SE', flag: 'SE.png' },
    { label: 'Switzerland', iso: 'CH', value: 'CH', flag: 'CH.png' },
    { label: 'Syrian Arab Republic', iso: 'SY', value: 'SY', flag: 'SY.png' },
    { label: 'Taiwan, Province of China', iso: 'TW', value: 'TW', flag: 'TW.png' },
    { label: 'Tajikistan', iso: 'TJ', value: 'TJ', flag: 'TJ.png' },
    { label: 'Tanzania', iso: 'TZ', value: 'TZ', flag: 'TZ.png' },
    { label: 'Thailand', iso: 'TH', value: 'TH', flag: 'TH.png' },
    { label: 'Timor-Leste', iso: 'TL', value: 'TL', flag: 'TL.png' },
    { label: 'Togo', iso: 'TG', value: 'TG', flag: 'TG.png' },
    // { label: 'Tokelau', iso: 'TK', value: 'TK', flag: 'TK.png' },
    { label: 'Tonga', iso: 'TO', value: 'TO', flag: 'TO.png' },
    { label: 'Trinidad and Tobago', iso: 'TT', value: 'TT', flag: 'TT.png' },
    { label: 'Tunisia', iso: 'TN', value: 'TN', flag: 'TN.png' },
    { label: 'Turkey', iso: 'TR', value: 'TR', flag: 'TR.png' },
    { label: 'Turkmenistan', iso: 'TM', value: 'TM', flag: 'TM.png' },
    // { label: 'Turks and Caicos Islands', iso: 'TC', value: 'TC', flag: 'TC.png' },
    { label: 'Tuvalu', iso: 'TV', value: 'TV', flag: 'TV.png' },
    { label: 'Uganda', iso: 'UG', value: 'UG', flag: 'UG.png' },
    { label: 'Ukraine', iso: 'UA', value: 'UA', flag: 'UA.png' },
    { label: 'United Arab Emirates', iso: 'AE', value: 'AE', flag: 'AE.png' },
    { label: 'United Kingdom', iso: 'GB', value: 'GB', flag: 'GB.png' },
    { label: 'United States', iso: 'US', value: 'US', flag: 'US.png' },
    // { label: 'United States Minor Outlying Islands', iso: 'UM', value: 'UM', flag: 'UM.png' },
    { label: 'Uruguay', iso: 'UY', value: 'UY', flag: 'UY.png' },
    { label: 'Uzbekistan', iso: 'UZ', value: 'UZ', flag: 'UZ.png' },
    { label: 'Vanuatu', iso: 'VU', value: 'VU', flag: 'VU.png' },
    { label: 'Venezuela', iso: 'VE', value: 'VE', flag: 'VE.png' },
    { label: 'Viet Nam', iso: 'VN', value: 'VN', flag: 'VN.png' },
    // { label: 'Virgin Islands, British', iso: 'VG', value: 'VG', flag: 'VG.png' },
    // { label: 'Virgin Islands, U.S.', iso: 'VI', value: 'VI', flag: 'VI.png' },
    // { label: 'Wallis and Futuna', iso: 'WF', value: 'WF', flag: 'WF.png' },
    // { label: 'Western Sahara', iso: 'EH', value: 'EH', flag: 'EH.png' },
    { label: 'Yemen', iso: 'YE', value: 'YE', flag: 'YE.png' },
    { label: 'Zambia', iso: 'ZM', value: 'ZM', flag: 'ZM.png' },
    { label: 'Zimbabwe', iso: 'ZW', value: 'ZW', flag: 'ZW.png' }
  ];

  // Get Country Name by ISO
  getCountryByISO(iso) {
    let label = '';
    this.countries.forEach(country => {
      if(country.iso == iso) {
        label = country.label;
      }
    });

    return label;
  }

}
