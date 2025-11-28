import './App.css';

import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  button: {
    color: 'red',
    backgroundColor: 'blue',
  }
})

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <button {...stylex.props(styles.button)}>Click me</button>
    </div>
  );
};

export default App;
