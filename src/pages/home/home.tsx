import CalendarComponent from "../../components/calendar/calendar";
import Todo from "../../components/toDo/toDo";
import Style from "./home.style";

const Home = () => {
  return (
    <Style.Container>
      <CalendarComponent />
      <Todo />
    </Style.Container>
  );
};

export default Home;
