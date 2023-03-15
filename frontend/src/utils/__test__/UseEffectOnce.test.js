import { useRef, useState, useEffect } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

describe('UseEffectOnce', () => {
  it('should call the effect function once', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => UseEffectOnce(mockFn));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should not call the destroy function if the effect has not been called', () => {
    const mockFn = jest.fn();
    const mockDestroyFn = jest.fn();
    const { result } = renderHook(() => UseEffectOnce(mockFn));
    expect(mockDestroyFn).not.toHaveBeenCalled();
  });

  it('should call the destroy function if the effect has been called', () => {
    const mockFn = jest.fn();
    const mockDestroyFn = jest.fn();
    const { result } = renderHook(() => UseEffectOnce(mockFn));
    act(() => {
      result.current();
    });
    expect(mockDestroyFn).toHaveBeenCalled();
  });
});
