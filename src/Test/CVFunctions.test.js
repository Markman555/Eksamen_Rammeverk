import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchCV, createCV, updateCVById, deleteCVById } from '../Utils/CvsApi';

const BASE_URL = "https://crudcrud.com/api/6203786faf284d84aee5f7072199e1c8";

// Mock the CV data
const mockCVData = {
    personalInfo: { name: "John Doe" },
    education: "University of Example",
    workExperience: "Software Developer"
};

const mockCVId = '1';

describe('CV Functions', () => {
  // Before each test, set up the mock for fetch
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(vi.fn());
  });

  // After each test, reset the mock
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch CVs successfully', async () => {
    // Mock the fetch response for GET request
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce([{ _id: mockCVId, personalInfo: { name: "John Doe" } }]),
    });

    const result = await fetchCV();
    expect(result).toEqual([{ _id: mockCVId, personalInfo: { name: "John Doe" } }]);
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/cvs`);
  });

  it('should create a CV successfully', async () => {
    // Mock the fetch response for POST request
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({ _id: mockCVId, personalInfo: { name: "John Doe" } }),
    });

    const result = await createCV(mockCVData, 'John Doe');
    expect(result).toEqual({ _id: mockCVId, personalInfo: { name: "John Doe" } });
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/cvs`, expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ ...mockCVData, userName: 'John Doe' })
    }));
  });

  it('should update a CV successfully', async () => {
    // Mock the fetch response for PUT request
    global.fetch.mockResolvedValueOnce({ status: 200 });

    const result = await updateCVById(mockCVId, mockCVData);
    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/cvs/${mockCVId}`, expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify(mockCVData)
    }));
  });

  it('should fail to update a CV with an error', async () => {
    // Mock the fetch response for PUT request with an error
    global.fetch.mockResolvedValueOnce({ status: 400 });

    const result = await updateCVById(mockCVId, mockCVData);
    expect(result).toBe(false);
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/cvs/${mockCVId}`, expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify(mockCVData)
    }));
  });

  it('should delete a CV successfully', async () => {
    // Mock the fetch response for DELETE request
    global.fetch.mockResolvedValueOnce({ ok: true });

    await deleteCVById(mockCVId);
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/cvs/${mockCVId}`, { method: 'DELETE' });
  });

  it('should handle delete error correctly', async () => {
    // Mock the fetch response for DELETE request with an error
    global.fetch.mockResolvedValueOnce({ ok: false, status: 400 });

    try {
      await deleteCVById(mockCVId);
    } catch (e) {
      expect(e.message).toBe('Failed to delete CV: 400');
    }
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/cvs/${mockCVId}`, { method: 'DELETE' });
  });

});