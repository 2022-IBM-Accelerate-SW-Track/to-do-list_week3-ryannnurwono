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
 test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "5/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });
 test('No duplicate task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "5/30/2023";
  const newDueDate = "5/29/2023";
  fireEvent.change(inputTask, { target: { value: "Test Duplicate"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Test Duplicate"}});
  fireEvent.change(inputDate, { target: { value: newDueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/Test Duplicate/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  const checkNewDate = screen.getByText(new RegExp(newDueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  expect(checkNewDate).not.toBeInTheDocument();
 });