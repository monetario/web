
import React from 'react';
import Datetime from 'react-datetime';
import Formsy from 'formsy-react';
import Moment from 'moment';

const MonthChoise = React.createClass({

  getDefaultProps() {
    return {
    };
  },

  render() {
    return (
      <div className="datepicker datepicker-inline">
        <div className="datepicker-days" style={{display: 'none'}}>
          <table className="table table-condensed">
            <thead>
            <tr>
              <th className="prev" style={{visibility: 'visible'}}>«</th>
              <th colSpan="5" className="datepicker-switch">January 2005</th>
              <th className="next" style={{visibility: 'visible'}}>»</th>
            </tr>
            <tr>
              <th className="dow">Su</th>
              <th className="dow">Mo</th>
              <th className="dow">Tu</th>
              <th className="dow">We</th>
              <th className="dow">Th</th>
              <th className="dow">Fr</th>
              <th className="dow">Sa</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className="old day">26</td>
              <td className="old day">27</td>
              <td className="old day">28</td>
              <td className="old day">29</td>
              <td className="old day">30</td>
              <td className="old day">31</td>
              <td className="day">1</td>
            </tr>
            <tr>
              <td className="day">2</td>
              <td className="day">3</td>
              <td className="day">4</td>
              <td className="day">5</td>
              <td className="day">6</td>
              <td className="day">7</td>
              <td className="day">8</td>
            </tr>
            <tr>
              <td className="day">9</td>
              <td className="day">10</td>
              <td className="day">11</td>
              <td className="day">12</td>
              <td className="day">13</td>
              <td className="day">14</td>
              <td className="day">15</td>
            </tr>
            <tr>
              <td className="day">16</td>
              <td className="day">17</td>
              <td className="day">18</td>
              <td className="day">19</td>
              <td className="day">20</td>
              <td className="day">21</td>
              <td className="day">22</td>
            </tr>
            <tr>
              <td className="day">23</td>
              <td className="day">24</td>
              <td className="day">25</td>
              <td className="day">26</td>
              <td className="day">27</td>
              <td className="day">28</td>
              <td className="day">29</td>
            </tr>
            <tr>
              <td className="day">30</td>
              <td className="day">31</td>
              <td className="new day">1</td>
              <td className="new day">2</td>
              <td className="new day">3</td>
              <td className="new day">4</td>
              <td className="new day">5</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <th colSpan="7" className="today" style={{display: 'none'}}>Today</th>
            </tr>
            <tr>
              <th colSpan="7" className="clear" style={{display: 'none'}}>Clear</th>
            </tr>
            </tfoot>
          </table>
        </div>
        <div className="datepicker-months" style={{display: 'block'}}>
          <table className="table table-condensed">
            <thead>
            <tr>
              <th className="prev" style={{visibility: 'visible'}}>«</th>
              <th colSpan="5" className="datepicker-switch">2005</th>
              <th className="next" style={{visibility: 'visible'}}>»</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan="7"><span className="month">Jan</span><span className="month">Feb</span><span className="month">Mar</span><span className="month">Apr</span><span className="month">May</span><span className="month">Jun</span><span className="month">Jul</span><span className="month">Aug</span><span className="month">Sep</span><span className="month">Oct</span><span className="month">Nov</span><span className="month">Dec</span></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <th colSpan="7" className="today" style={{display: 'none'}}>Today</th>
            </tr>
            <tr>
              <th colSpan="7" className="clear" style={{display: 'none'}}>Clear</th>
            </tr>
            </tfoot>
          </table>
        </div>
        <div className="datepicker-years" style={{display: 'none'}}>
          <table className="table table-condensed">
            <thead>
            <tr>
              <th className="prev" style={{visibility: 'visible'}}>«</th>
              <th colSpan="5" className="datepicker-switch">2000-2009</th>
              <th className="next" style={{visibility: 'visible'}}>»</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan="7"><span className="year old">1999</span><span className="year">2000</span><span className="year">2001</span><span className="year">2002</span><span className="year">2003</span><span className="year">2004</span><span className="year">2005</span><span className="year">2006</span><span className="year">2007</span><span className="year">2008</span><span className="year">2009</span><span className="year new">2010</span></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <th colSpan="7" className="today" style={{display: 'none'}}>Today</th>
            </tr>
            <tr>
              <th colSpan="7" className="clear" style={{display: 'none'}}>Clear</th>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
});

export default MonthChoise;

