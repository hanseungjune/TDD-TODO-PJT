# 😀 ToyPJT - TDD(Test-Driven-Development) 방법론 - todoList PJT

## ⚙️ 실행 방법

```
npm install
npm run start
```

## 🎛️ 커밋 컨벤션

```
feat: 기능 추가, 삭제, 변경 (코드 수정)
refactor: 코드 리팩토링
docs: 코드 외 문서의 추가, 삭제, 변경
env: 모듈 및 라이브러리 설치 등
```

<br/>

## 🗓️ 기간

- 2023년 8월 7일 ~ 2023년 8월 10일

<br/>

## 🧭 목적

- TypeScript & Redux-toolkit 사용해보기
- React-Query를 통해서 CRUD 요청해보기
- MSW를 통해서 백엔드 목업 로직 구현하기
- `npm test`를 통해서 각 컴포넌트 테스트를 통해서 TDD 개발하기

<br/>

## ✅ Task

### ❗구현 사항

- ⭕ TypeScript & Redux-toolkit 사용해보기
- ⭕ React-Query를 통해서 CRUD 요청해보기
- ⭕ MSW를 통해서 백엔드 목업 로직 구현하기
- ⭕ `npm test`를 통해서 각 컴포넌트 테스트를 통해서 TDD 개발하기

<br/>

## 💡 진행방식

1.  구현을 우선순위로하고, 트러블 슈팅이나 리팩토링 할 부분이 있다면, 추가적으로 진행할 예정입니다.

<br/>

## 🎖️ Members

<table border>
  <tbody>
    <tr>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/92035406?v=4"  alt=""/>
        FE.<br/>
        <a href="https://github.com/hanseungjune">
          <img src="https://img.shields.io/badge/한승준-000000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
     </tr>
  </tbody>
</table>

<br/>

## 🛠️ Stacks

![react](https://user-images.githubusercontent.com/123078739/234895132-18ab503a-fcc7-486d-b89a-cb0cc1f7796b.svg)
![typescript](https://user-images.githubusercontent.com/123078739/234895162-42f905c6-765d-44d2-bcb1-b011286ef6b2.svg)
![redux](https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![reactquery](https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![msw](https://img.shields.io/badge/msw-9A8555?style=for-the-badge&logo=msi&logoColor=white)
![Emotion.js](https://img.shields.io/badge/Emotion.js-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)

<br/>

### 📍 기능

- todoList 목록 가져오기
- todoList 목록 추가하기
- todoList 삭제하기(다중 가능)
- todoList 수정하기(다중 선택 가능, 하지만 제일 앞에 있는 것만 수정)
- todoList 완료하기(🖤 → ❤️)

<table border>
  <tr>
    <td><img src="./my-todo-list/public/TDD todos.gif" alt="GitHub issue Page"/></td>
  </tr>
  <tr>
    <td align="center">TDD todos Page</td>
  </tr>
</table>

### 🌳 File Tree

```
📦src
 ┣ 📂app
 ┃ ┗ 📜store.ts
 ┣ 📂components
 ┃ ┣ 📜TodoCommand.test.tsx
 ┃ ┣ 📜TodoCommand.tsx
 ┃ ┣ 📜TodoList.test.tsx
 ┃ ┣ 📜TodoList.tsx
 ┃ ┣ 📜TodoListContainer.test.tsx
 ┃ ┗ 📜TodoListContainer.tsx
 ┣ 📂features
 ┃ ┗ 📜todoSlice.ts
 ┣ 📂mocks
 ┃ ┣ 📜browser.ts
 ┃ ┣ 📜handler.ts
 ┃ ┗ 📜server.ts
 ┣ 📂style
 ┃ ┣ 📜TodoCommandS.ts
 ┃ ┣ 📜TodoListContainerS.ts
 ┃ ┗ 📜TodoListS.ts
 ┣ 📜App.test.tsx
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```

## ✨ GitHub Issues Web Page

### 💥리팩토링 Case 1. 수정 후, inputValue 초기화 및 선택 해제

```tsx
//todoCommand.tsx
const updateTodoMutation = useMutation(
  (updatedTodo: Todo) =>
    fetch(`api/todos/${updatedTodo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    }).then((res) => res.json()),
  {
    onSuccess: (data) => {
      dispatch(updatedTodo(data));
      Swal.fire({
        icon: "success",
        title: "수정 완료!",
        text: "할 일이 성공적으로 수정되었습니다.",
        confirmButtonText: "확인",
      });
      // 해당 코드를 추가해서 inputValue 초기화, id 선택 초기화
      dispatch(toggleSelectTodo(-1));
      dispatch(setInputValue(""));
      // 해당 코드를 추가해서 inputValue 초기화, id 선택 초기화
      queryClient.invalidateQueries("todos");
    },
  }
);
```

```ts
//todoSlice.ts
toggleSelectTodo: (state, action: PayloadAction<number>) => {
const id = action.payload;
    // 해당 코드를 추가해서 선택 해제
    if (id === -1) {
        state.selectedTodos = [];
    // 해당 코드를 추가해서 선택 해제
    } else if (state.selectedTodos.includes(id)) {
        state.selectedTodos = state.selectedTodos.filter(
            (todoId) => todoId !== id
        );
        } else {
        state.selectedTodos.push(id);
        }
},
```

```tsx
//todoList.tsx
const handleToggleSelectTodo = (id: number) => {
  // 해당 코드를 추가해서 inputValue 초기화
  if (selectedTodos.includes(id)) {
    dispatch(setInputValue(""));
    // 해당 코드를 추가해서 inputValue 초기화
  } else {
    const selectedTodo = todos.find((todo) => todo.id === id);
    if (selectedTodo) {
      dispatch(setInputValue(selectedTodo.text));
    }
  }
  dispatch(toggleSelectTodo(id));
};
```

### 💥리팩토링 Case 2. 일정 추가 TEST 코드 수정

```ts
test("일정 추가 버튼 클릭 시 동작", async () => {
  render(
    <Provider store={mockStore}>
      <QueryClientProvider client={queryClient}>
        <TodoCommand />
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );

  // TEST 코드 수정 및 추가 부분
  await waitFor(() => {
    expect(mockStore.getState().todos.todos.length).toBe(6);
  });

  const inputElement = await waitFor(() =>
    screen.getByPlaceholderText("할 일을 입력하세요")
  );

  fireEvent.change(inputElement, { target: { value: "새로운 할 일" } });
  // TEST 코드 수정 및 추가 부분

  const addButton = await waitFor(() => screen.getByText("일정 추가"));
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(mockStore.getState().todos.todos.length).toBe(7);
  });
});
```

### 💥리팩토링 Case 3. inputValue가 빈값일 때는 추가 안되게 하기

```ts
const handleAddTodo = () => {
  // 빈 값이면 함수 동작 멈추기
  if (!inputValue.trim()) {
    return;
  }
  // 빈 값이면 함수 동작 멈추기
  const newTodo = {
    id: todos.length,
    text: inputValue,
    completed: false,
  };
  mutation.mutate(newTodo);
};
```

### 💥리팩토링 Case 4. 일정 추가 시, 쿼리 요청 초기화로 리렌더링하게 만들기

```ts
const mutation = useMutation(
  async (newTodo: Todo) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    return response.json();
  },
  {
    onSuccess: (data) => {
      dispatch(addTodo(data));
      dispatch(setInputValue(""));
      // 쿼리 요청 초기화
      queryClient.invalidateQueries("todos");
      // 쿼리 요청 초기화
    },
  }
);
```

## ✒️ 회고

<table>
  <thead>
    <tr>
      <th width="45%">프로젝트 후기</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li><strong>기술 스택에 대한 경험: </strong>React-Query와 Redux-toolkit을 처음 사용해보았는데, 이러한 현대적인 툴들을 활용하는 것이 얼마나 중요한지 알게 되었다. 특히 action 객체의 형태에 대한 체크의 중요성을 느끼게 해준 경험이었다.</li>
        <li><strong>TDD의 중요성: </strong>TDD 방식은 초기에는 시간이 많이 들었지만, 코드의 안정성을 높이고 버그를 줄이는 데 큰 도움이 되었다</li>
        <li><strong>코드 리팩토링: </strong>프로젝트 진행 중 여러 차례 리팩토링을 진행했는데, 이 과정에서 코드의 가독성과 효율성을 높일 수 있었습니다. 리팩토링은 단순한 코드 변경이 아니라, 더 나은 코드로의 지속적인 변화라는 것을 깨달았습니다.</li>
        <li><strong>데이터 기술적 성장:</strong> MSW와 같은 새로운 기술을 배우고 사용해 볼 수 있었습니다. MSW를 사용해봄으로써 백엔드가 놓치고 있는 점들을 체크해보고 의견을 전달하는 능력이 생겼다고 생각합니다.</li>
      </td>
    </tr>
  </tbody>
</table>
