import "./App.css";
import { DatePicker } from "./datepicker/DatePicker";

function App() {
  return (
    <>
      <section>
        <div>
          <h1>Default</h1>
          <p>Component with default config</p>
          <div>
            <DatePicker />
          </div>
        </div>
        <div>
          <h1>Single date</h1>
          <p>Component with date input</p>
          <div>
            <DatePicker hasInputs />
          </div>
        </div>
        <div>
          <h1>Single date time</h1>
          <p>Component with date and time inputs</p>
          <div>
            <DatePicker hasInputs hasTime />
          </div>
        </div>
      </section>

      <section>
        <div>
          <h1>Range</h1>
          <p>Component with range</p>
          <div>
            <DatePicker isRange />
          </div>
        </div>
        <div>
          <h1>Range date</h1>
          <p>Component with date inputs</p>
          <div>
            <DatePicker isRange hasInputs />
          </div>
        </div>
        <div>
          <h1>Range date time</h1>
          <p>Component with date and time inputs</p>
          <div>
            <DatePicker isRange hasInputs hasTime />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
