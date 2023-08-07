import { Global, css } from "@emotion/react";
import TodoListContainer from "./components/TodoListContainer";

function App() {
  return (
    <div>
      <Global
        styles={css`
          :root {
            --text-color: #2f2f2f;
            --bg-color: #f6f4eb;
            --main-color: #91c8e4;
            --sub-color: #4682a9;
            --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial;
          }
          body {
            margin: 0;
            font-family: var(--font-family);
            color: var(--text-color);
            background-color: var(--bg-color);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          body > div > div {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
              monospace;
          }
        `}
      />
      <TodoListContainer />
    </div>
  );
}

export default App;
