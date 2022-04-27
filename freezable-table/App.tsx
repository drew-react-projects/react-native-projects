// import { View, StyleSheet } from 'react-native';
import testData from './testData.js';
import FreezableTable from './FreezableTable';

/**
 interface FreezableTableProps {
  data: DataItem[];           REQUIRED, array of objects with consistent number of keys
  width: number[];            REQUIRED, length = data keys number + 1

  firstCellContent?: string;   OPTIONAL, desc: text content of the top left corner cell
  freezeColNum?: number;      OPTIONAL, desc: number of freeze column from left to right, default = 1
  freezeHeaderNum?: number;   OPTIONAL, desc: number of freeze header from top to bottom, default = 1
  
  boldHeader? boolean;
  boldFreezeCol? boolean;
  capHeader? boolean;         OPTIONAL, if capHeader AND upperHeader are set, header will be UPPERCASE
  upperHeader? boolean;

  borderWidth?: number;
  marginTop?: number;
  marginBottom?: number;

  bgColors?: {
    cornerCell?: string;
    header?: string;
    freezeColumn?: string;
    body?: string;
  };

  textColors?: {
    cornerCell?: string;
    header?: string;
    freezeColumn?: string;
    body?: string;
  };
}
*/
export default function App() {
  return (
    <FreezableTable
      data={testData}
      width={[100, 175, 175, 275, 250, 175]}
      // freezeHeaderNum={2}
      // freezeColNum={2}
      // firstCellContent="count"

      // boldHeader={true}
      // boldFreezeCol={true}
      // capHeader={true}
      // upperHeader={true}

      marginTop={40}
      // bgColors={{
      //   cornerCell: 'cyan',
      //   header: 'lime',
      //   freezeColumn: 'lightpink',
      //   body: 'white',
      // }}
      // textColors={{
      //   cornerCell: '#000',
      //   header: '#000',
      //   freezeColumn: '#000',
      //   body: '#000',
      // }}
    />
  );
}
