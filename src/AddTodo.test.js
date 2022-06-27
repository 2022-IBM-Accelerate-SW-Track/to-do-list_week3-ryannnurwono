import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });
 
 test('No duplicate task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "10/30/2023";
  const newDueDate = "10/29/2023";
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: newDueDate}});
  fireEvent.click(element);
  const check = screen.getAllByText(/Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check.length).toBe(1);
  expect(checkDate).toBeInTheDocument();
 });
 test('No task without date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "TestNoDueDate"}});
  fireEvent.click(element);
  try {
    const check = screen.getByText(/TestNoDueDate/i);
    expect(check).not.toBeInTheDocument();
  } catch (error) {
    if(error.name === 'TestingLibraryElementError'){
      
    }
    else{
      throw error;
    }
  }
 });
 test('No name test', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "10/30/2023";
  fireEvent.change(inputTask, { target: { value: "Tester"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Tester"}});
  fireEvent.click(element);
  const check = screen.getAllByText(/Tester/i);
  expect(check.length).toBe(1);
 });
 test('Late Tasks are different colors', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "10/30/2023";
  const newDueDate = "10/29/2020";
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "oldTask"}});
  fireEvent.change(inputDate, { target: { value: newDueDate}});
  fireEvent.click(element);
  const check = !(screen.getByTestId(/Test/i).style.background===screen.getByTestId(/oldTask/i).style.background);
  expect(check).toBe(true);
 });
 test('Delete tasks', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "10/30/2023";
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/Test/i);
  expect(check).toBeInTheDocument();
  const checker = screen.getByRole('checkbox');
  fireEvent.click(checker);
  const emptyMsg = screen.getByText(/You have no todo's left/i);
  expect(emptyMsg).toBeInTheDocument();
 });