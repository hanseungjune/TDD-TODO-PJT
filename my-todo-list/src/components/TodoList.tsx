const TodoList = () => {
  return (
    <section>
      <article>
        <div>1번째 할 일</div>
        <div>
          <span>오늘 내가 해야할 일의 내용</span>
          <label htmlFor={`todo ${0}`}>
            <input type="checkbox" />
          </label>
        </div>
      </article>
    </section>
  );
};

export default TodoList;
