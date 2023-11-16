// import moment from "moment";
import styled from "styled-components";
import CreateTodoScreen from "./CreateTodoScreen";
import { useEffect, useState, useMemo } from "react";
import { readTasks , viewOneAndUpdateTodo } from "./Api/API";
import moment from "moment";

const App = () => {
  const [state, setState] = useState<Array<{}>>([]);
  const [state1, setState1] = useState<Array<{}>>([]);
  const [state2, setState2] = useState<Array<{}>>([]);
  const [stateSearch, setStateSearch] = useState<Array<{}>>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  useEffect(() =>{
    readTasks().then((res) =>{
      setState(res)
      console.log(state)
    })
  },[]);
  useEffect(() =>{
    readTasks().then((res) =>{
      setState1(res)
      console.log(state)
    })
  },[]);

  // useMemo(() => {
  //   setStateSearch(state.filter((el: any) => el.task.includes(text)));
  // }, [state, text]);

  // let mtTime = setTimeout(() =>{
    
  //   clearTimeout(mtTime)
  // }, 5000)

  return (
    <div>
      <Container>
          <Br>
            <Button
            onClick={() => {
              setToggle(true);
            }}
            >
              Add Task
            </Button>
          </Br>

          {/* <Div>
          <Input
            placeholder="search a TODO"
            value={text}
            onChange={(e: any) => {
              setText(e.target.value);
            }}
          />
        </Div> */}

        <Main>
        {state?.map((props: any) =>{
          return(
            <Card key={props._id}>
            <Tasked>
              {props.task}
            </Tasked>
            <Time rr="1">
              <TimeWrap>
              <div>CreatedAt: </div>
              </TimeWrap>
              {props.createdAt}
            </Time>
            {/* <Time>
              <TimeWrap>
              <div>EndAt: </div>
              </TimeWrap>
              {moment(new Date().getTime()).format("LLLL")}
            </Time> */}
            <hr />

            <Text>{props.done}</Text>

            {/* <br /> */}
            <hr />
            <But>
              <Button
              onClick={() => {
              setToggle(true);
            }}
              >Start a Task</Button>
            </But>
          </Card>
          )
        })}
        {state1?.map((props: any) =>(
          <Card>
          <Tasked>
            {props.task}
          </Tasked>
          {/* <Time rr="1">
            <TimeWrap>
            <div>CreatedAt: </div>
            </TimeWrap>
            {moment(new Date().getTime()).format("LLLL")}
          </Time> */}
          <Time>
            <TimeWrap>
            <div>EndAt: </div>
            </TimeWrap>
            {props.deadline}
          </Time>
          <hr />

          <Text>Ongoing Task</Text>

          {/* <br /> */}
          <hr />
          <But>
            <Button>update Task</Button>
          </But>
        </Card>
        ))}
        <Card>
            <Tasked>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam sed magni id repellat doloribus cum est aliquid, ad fuga nam!
            </Tasked>
            {/* <Time rr="1">
              <TimeWrap>
              <div>CreatedAt: </div>
              </TimeWrap>
              {moment(new Date().getTime()).format("LLLL")}
            </Time>
            <Time>
              <TimeWrap>
              <div>EndAt: </div>
              </TimeWrap>
              {moment(new Date().getTime()).format("LLLL")}
            </Time> */}
            <hr />

            <Text>Task Done</Text>

            {/* <br /> */}
            <hr />
            <But>
              <Button>update Task</Button>
            </But>
          </Card>
        </Main>
      </Container>
        {toggle && <CreateTodoScreen toggle={toggle} setToggle={setToggle} />}
    </div>
  )
}

export default App;
const Input = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid silver;
  outline: none;
  padding-left: 10px;
  margin-bottom: 20px;
  &::placeholder {
    font-family: "Poppins";
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
`;
const Br = styled.div`
  margin: 60px 0;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  text-align: center;
  margin: 5px 0;
  font-size: 12px;
  font-weight: 900;
`
const But = styled.div`
display: flex;
justify-content: center;
`
const Button = styled.div`
  padding: 10px 18px;
  background-color: #420042;
  color: white;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;

  &:hover{
    cursor: pointer;
  }
`
const TimeWrap = styled.div`
  width: 95%;
`;
const Time = styled.div<{rr?: string}>`
  font-size: 12px;
  margin: 10px 0;
  line-height: 1;

  display: flex;
  flex-direction: column;

  ${TimeWrap} {
    display: flex;
  flex-direction: ${({rr}) => (rr ? "row" : "row-reverse")};
    div{
    font-size: 10px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  }
`
const Tasked = styled.div`
  border-radius: 5px;
  border: 1px solid silver;
  padding: 5px;
  font-size: 15px;
  line-height: 1.2;
`
const Card = styled.div`
  width: 200px;
  min-height: 100px;
  border-radius: 5px;
  border: 1px solid silver;
  margin: 10px;
  padding: 5px;
`
const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`
const Container = styled.div``
