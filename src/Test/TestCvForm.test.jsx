import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CVForm from '../Components/CV/CVForm'; 

test('calls onSave with filled out data', async () => {
  const mockSave = vi.fn();
  const mockCancel = vi.fn();

  render(<CVForm initialData={null} onSave={mockSave} onCancel={mockCancel} />);

  // Fill in the form with some test data
 fireEvent.change(screen.getByLabelText(/name:/i), { target: { value: 'John Doe' } }); 
 fireEvent.change(screen.getByLabelText(/email:/i), { target: { value: 'johndoe@example.com' } }); 
 fireEvent.change(screen.getByLabelText(/phone:/i), { target: { value: '123456789' } }); 

  // Click the Save button
 fireEvent.click(screen.getByText(/save/i));

  // Verify that mockSave was called with correct data
  expect(mockSave).toHaveBeenCalledWith(
    expect.objectContaining({
      personalInfo: expect.objectContaining({
        name: expect.any(String),
        email: expect.stringContaining('@'),
        phone: expect.stringMatching(/^\d{9}$/), 
      }),
      education: [],
      experience: [],
      references: [],
      skills: [],
    })
  );

  expect(mockSave).toHaveBeenCalledTimes(1);
});