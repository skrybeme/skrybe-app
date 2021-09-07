import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { SidebarContext, SidebarProvider } from './context';
import { container } from '@/container/mock';
import { ContainerProvider } from '@/ui/providers';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import * as SidebarComponents from '.';

jest.spyOn(SidebarComponents, 'Sidebar').mockReturnValue(<></>);

const Fixture = ({ children }: any) => (
  <ContainerProvider container={container}>
    <SidebarProvider>
      {children}
    </SidebarProvider>
  </ContainerProvider>
);

describe(`Context: Sidebar`, () => {
  it(`manages sidebar open/close state`, () => {
    const { result } = renderHook(() => useContext(SidebarContext), {
      wrapper: Fixture
    });

    expect(result.current.isOpen).toBeFalsy();

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBeTruthy();

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBeFalsy();
  });

  it(`returns default card id as undefined`, () => {
    const { result } = renderHook(() => useContext(SidebarContext), {
      wrapper: Fixture
    });

    expect(result.current.cardId).toBeUndefined();
  });

  it(`sets card id`, () => {
    const { result } = renderHook(() => useContext(SidebarContext), {
      wrapper: Fixture
    });

    act(() => {
      result.current.setCardId('test-id');
    });

    expect(result.current.cardId).toEqual('test-id');
  });

  it(`unsets card id`, () => {
    const { result } = renderHook(() => useContext(SidebarContext), {
      wrapper: Fixture
    });

    act(() => {
      result.current.setCardId('test-id');
    });

    act(() => {
      result.current.unsetComponent();
    });

    expect(result.current.cardId).toBeUndefined();
  });
});
