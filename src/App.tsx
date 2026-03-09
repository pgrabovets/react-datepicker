import "./App.css";
import { DatePicker } from "./datepicker/DatePicker";

function App() {
  return (
    <>
      <DatePicker isRange={true} hasSlots={true} hasTime={true} />
    </>
  );
}

export default App;
