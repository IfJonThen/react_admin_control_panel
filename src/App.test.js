import React from 'react';
import ReactDOM from 'react-dom';
import RosterForm,{RosterEdit} from './components/RosterView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <div>
        <RosterForm /><RosterEdit/>
      </div>, div);
});
