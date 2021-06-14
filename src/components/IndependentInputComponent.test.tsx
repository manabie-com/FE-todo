import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import IndependentInputComponent from './IndependentInputComponent';

test('normal input - valid display text', () => {
  const {getByDisplayValue} = render(<IndependentInputComponent value="hello"/>);
  const element = getByDisplayValue('hello');
  expect(element).toBeInTheDocument();
});

test('doubleClickToActive input - valid display text + disable by default + active when double click + disable when enter', async () => {
  const {getByDisplayValue} = render(<IndependentInputComponent value="hello" doubleClickToActive={true}/>);
  const element = getByDisplayValue('hello');
  expect(element).toBeInTheDocument();
  expect(element).toBeDisabled();

  await fireEvent.dblClick(element);
  expect(element).toBeEnabled();

  await fireEvent.keyDown(element, {key: 'Enter', code: 'Enter'});
  expect(element).toBeDisabled();
});
