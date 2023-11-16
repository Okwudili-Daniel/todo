// import moment from "moment";
import styled from "styled-components";
import CreateTodoScreen from "./CreateTodoScreen";
import { useEffect, useState, useMemo } from "react";
import { readAllTodo, updateTodo } from "./Api/API";

const App = () => {
  const [state, setState] = useState<Array<{}>>([]);
  const [stateSearch, setStateSearch] = useState<Array<{}>>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  useEffect(() =>{
    readAllTodo().then((res) =>{
      setState(res)
      // console.log(state)
    })
  },[]);

  useMemo(() => {
    setStateSearch(state.filter((el: any) => el.task.includes(text)));
  }, [state, text]);

  let mtTime = setTimeout(() =>{
    
    clearTimeout(mtTime)
  }, 5000)

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

          <Div>
          <Input
            placeholder="search a TODO"
            value={text}
            onChange={(e: any) => {
              setText(e.target.value);
            }}
          />
        </Div>

        <Main>
          {state && stateSearch.map((props: any) =>{
            return (
              <Card 
              style={{backgroundColor: props.done ? "green" : "red"}}
              key={props._id}>
            <Tasked>
              {props.task}
            </Tasked>
            <Time rr="1">
              <TimeWrap>
              <div>CreatedAt: </div>
              </TimeWrap>
              {props.createdAt}
            </Time>
            <Time>
              <TimeWrap>
              <div>EndAt: </div>
              </TimeWrap>
              {props.achievedAt}
            </Time>
            <hr />

            {props.done ? (
                    <Text>Todo was Achieved</Text>
                  ) : (
                    <Text>Todo wasn't Achieved</Text>
                  )}

            <br />
            <hr />
            <But>
                {props.achieved === null ? (
                   <Button
                   onClick={() => {
                    updateTodo(props._id);
                  }}
                   >Update Todo</Button>
                ) : (
                  <div>Time Elapse</div>
                )}
            </But>
          </Card>
            )
          })}
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
  margin: 10px 0;
  font-size: 12px;
  font-weight: 600;
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
  min-height: 150px;
  border-radius: 5px;
  border: 1px solid silver;
  margin: 10px;
  padding: 5px;
`
const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
const Container = styled.div``
