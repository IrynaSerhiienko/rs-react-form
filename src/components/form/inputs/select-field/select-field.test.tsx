import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SelectField } from './select-field';

describe('SelectField', () => {
  it('renders label, input, and datalist options', () => {
    const options = ['USA', 'UK', 'Canada'];
    render(<SelectField id="country" label="Country" options={options} />);

    const input = screen.getByLabelText(/country/i);
    expect(input).toBeInTheDocument();

    const dataList = document.getElementById('country-list');
    expect(dataList).toBeInTheDocument();

    const optionElements = dataList?.querySelectorAll('option') ?? [];
    const optionValues = Array.from(optionElements).map(
      (opt) => (opt as HTMLOptionElement).value
    );
    expect(optionValues).toEqual(options);
  });

  it('renders error text if provided', () => {
    render(
      <SelectField
        id="city"
        label="City"
        options={['Paris']}
        error="Required"
      />
    );
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it('applies required asterisk', () => {
    render(<SelectField id="city" label="City" options={['Paris']} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
