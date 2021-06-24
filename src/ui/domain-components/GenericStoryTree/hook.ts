import { GenericStoryTreeProps } from '@/interfaces/props';
import React from 'react';

export interface GenericStoryTreeHookResult {
  generateSubcards: (nodeId: string) => () => void;
  isOptionsPickerOpen: boolean;
  insertCard: (
    parentNodeId?: string,
    place?: {
      afterOrBefore: 'after' | 'before';
      nodeId: string;
    }
  ) => () => void;
  onOptionsPickerToggle: (isOpen: boolean) => void;
  removeCard: (nodeId: string) => () => void;
  updateCard: (nodeId: string) => (header: string) => void;
}

export function useGenericStoryTree({
  generateChildrenTreeNodes,
  insertTreeNode,
  removeTreeNode,
  updateTreeNode
}: Omit<GenericStoryTreeProps, 'root'>): GenericStoryTreeHookResult {
  const generateSubcards = React.useCallback((nodeId: string) => {
    return (): void => {
      generateChildrenTreeNodes(nodeId);
    }
  }, []);

  const insertCard = React.useCallback(
    (
      parentNodeId?: string,
      place?: {
        afterOrBefore: 'after' | 'before';
        nodeId: string;
      }
    ) => {
      return (): void => {
        insertTreeNode(parentNodeId, place)
      }
    },
    [insertTreeNode]
  );

  const removeCard = React.useCallback((nodeId: string) => {
    return (): void => {
      removeTreeNode(nodeId);
    }
  }, []);

  const updateCard = React.useCallback((nodeId: string) => {
    return (header: string): void => {
      updateTreeNode(nodeId, { header });
    }
  }, []);

  const [isOptionsPickerOpen, setIsOptionsPickerOpen] = React.useState(false);

  const onOptionsPickerToggle = React.useCallback((isOpen: boolean) => {
    setIsOptionsPickerOpen(isOpen);
  }, []);

  return {
    generateSubcards,
    isOptionsPickerOpen,
    insertCard,
    onOptionsPickerToggle,
    removeCard,
    updateCard
  };
}
