import { IoStatsChart } from 'react-icons/io5';
import './logo.scss';

interface Props {
  darkTheme: boolean;
}

export const Logo = (props: Props) => (
  <div className="app-title" title="Covalent Web3Dash">
    <span className="title-logo">
      <IoStatsChart className="chart" />
      WEB3<span className="pink">DASH</span>
    </span>
  </div>
);
