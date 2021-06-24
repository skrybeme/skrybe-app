import React from 'react';
import { Story } from '@storybook/react'
import { Modal } from '.';
import { ModalProps } from '@/interfaces/props';
import { lorem } from 'faker';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Common Components/Modal'
}

const ExampleContentComponent = styled.div`
  background-color: #fff;
  border-radius: 3px;
  color: #333;
  font-size: 18px;
  line-height: 22px;
  padding: 32px 48px;
`;

const Template: Story<ModalProps> = (args) => (
  <Modal {...args}>
    <ExampleContentComponent>
      <h4>
        {lorem.sentence()}
      </h4>
      <p>
        {lorem.sentences()}
      </p>
    </ExampleContentComponent>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  isVisible: false,
  onClickOutside: action('onClickOutside')
}
