import '@testing-library/jest-dom';
import React from 'react';
import { act, fireEvent, render, wait, waitFor } from '@testing-library/react';
import { Notifications } from '.';
import { container } from '@/container/mock';
import { ContainerProvider } from '@/ui/providers';
import { reaction, runInAction } from 'mobx';
import { ESLSubscriptionStore } from '@/store/ESLSubscriptionStore';
import * as SYMBOL from '@/container/symbols';
import { internet, lorem } from 'faker';

const Fixture = () => (
  <ContainerProvider container={container}>
    <Notifications />
  </ContainerProvider>
);

describe(`View: Notification`, () => {
  const store
    = container.get<ESLSubscriptionStore>(SYMBOL.store.ESLSubscriptionStore);

  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  })

  describe(`visibility behavior`, () => {
    describe(`initially`, () => {
      it(`opens navigation panel 1 second after mount`, async () => {
        const result = render(<Fixture />);

        act(() => {
          jest.advanceTimersByTime(999);
        });

        expect(result.queryByTestId('popover'))
          .not
          .toHaveClass('is-open');

        act(() => {
          jest.advanceTimersByTime(1);
        });

        expect(result.queryByTestId('popover')).toHaveClass('is-open');
      });

      it(`does not allow to close on outside click`, () => {
        const result = render(
          <div data-testid="outer">
            <Fixture />
          </div>
        );

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        const outer = result.queryByTestId('outer');

        fireEvent.click(outer!);

        expect(result.queryByTestId('popover')).toHaveClass('is-open');
      });

      it(`does not allow to click the trigger for 2s`, () => {
        const result = render(<Fixture />);

        const toggle = result.queryByTestId('picker-esl-trigger');

        act(() => {
          jest.advanceTimersByTime(500);
        });

        fireEvent.click(toggle!);

        expect(result.queryByTestId('popover'))
          .not
          .toHaveClass('is-open');

        act(() => {
          jest.advanceTimersByTime(1499);
        });

        expect(result.queryByTestId('popover')).toHaveClass('is-open');

        fireEvent.click(toggle!);

        expect(result.queryByTestId('popover')).toHaveClass('is-open');

        act(() => {
          jest.advanceTimersByTime(1);
        });

        fireEvent.click(toggle!);

        expect(result.queryByTestId('popover'))
          .not
          .toHaveClass('is-open');
      });
    });
    
    describe(`always`, () => {
      it(`shows the form on "keep me posted" button click`, () => {
        const result = render(<Fixture />);

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        const keepMePosted = result.queryByTestId('picker-esl-keep-me-posted');

        fireEvent.click(keepMePosted!);

        act(() => {
          jest.advanceTimersByTime(0);
        });

        expect(result.queryByTestId('form-sign-to-esl')).toBeInTheDocument();
      });

      it(`hides the form on "cancel" button click`, () => {
        const result = render(<Fixture />);

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        const keepMePosted = result.queryByTestId('picker-esl-keep-me-posted');

        fireEvent.click(keepMePosted!);

        act(() => {
          jest.advanceTimersByTime(0);
        });

        const cancel = result.queryByText('Cancel');

        fireEvent.click(cancel!);

        expect(result.queryByTestId('form-sign-to-esl')).not.toBeInTheDocument();
      });
      
      it(`closes notification panel on "dismiss" button click`, () => {
        const result = render(<Fixture />);

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        expect(result.queryByTestId('popover')).toHaveClass('is-open');

        const dismiss = result.queryByTestId('picker-esl-dismiss');

        fireEvent.click(dismiss!);

        expect(result.queryByTestId('popover'))
          .not
          .toHaveClass('is-open');
      });

      it(`closes notification panel on "toggle" button click`, () => {
        const result = render(<Fixture />);

        act(() => {
          jest.advanceTimersByTime(2000);
        });

        expect(result.queryByTestId('popover')).toHaveClass('is-open');

        const toggle = result.queryByTestId('picker-esl-trigger');

        fireEvent.click(toggle!);

        expect(result.queryByTestId('popover'))
          .not
          .toHaveClass('is-open');
      });
    });

    describe(`after the form is shown`, () => {
      it(`allows to close the popover on outside click`, () => {
        const result = render(
          <div data-testid="outer">
            <Fixture />
          </div>
        );

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        const keepMePosted = result.queryByTestId('picker-esl-keep-me-posted');

        fireEvent.click(keepMePosted!);

        act(() => {
          jest.advanceTimersByTime(0);
        });

        const outer = result.queryByTestId('outer');

        fireEvent.click(outer!);

        expect(result.queryByTestId('popover'))
          .not
          .toHaveClass('is-open');
      });
    });

    describe(`after dismiss button is clicked`, () => {
      it(`allows to close the popover on outside click`, () => {
        const result = render(
          <div data-testid="outer">
            <Fixture />
          </div>
        );

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        const dismiss = result.queryByTestId('picker-esl-dismiss');

        fireEvent.click(dismiss!);

        const toggle = result.queryByTestId('picker-esl-trigger');

        fireEvent.click(toggle!);

        const outer = result.queryByTestId('outer');

        fireEvent.click(outer!);

        expect(result.queryByTestId('popover'))
          .not
          .toHaveClass('is-open');
      });
    });

    describe(`when notification panel is closed and reopened`, () => {
      it(`reopens with form hidden`, () => {
        const result = render(<Fixture />);

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        const keepMePosted = result.queryByTestId('picker-esl-keep-me-posted');

        fireEvent.click(keepMePosted!);

        const toggle = result.queryByTestId('picker-esl-trigger');

        fireEvent.click(toggle!);

        fireEvent.click(toggle!);

        expect(result.queryByTestId('form-sign-to-esl')).not.toBeInTheDocument();
      });

      it(`saves input value`, () => {
        const result = render(<Fixture />);

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        const keepMePosted = result.queryByTestId('picker-esl-keep-me-posted');

        fireEvent.click(keepMePosted!);

        act(() => {
          jest.advanceTimersByTime(0);
        });

        const typedEmail = internet.email();

        const input = result.queryByTestId('form-sign-to-esl')?.querySelector('input');

        fireEvent.change(input!, {
          target: {
            value: typedEmail
          }
        });

        const toggle = result.queryByTestId('picker-esl-trigger');

        fireEvent.click(toggle!);

        fireEvent.click(toggle!);

        fireEvent.click(result.queryByTestId('picker-esl-keep-me-posted')!);

        act(() => {
          jest.advanceTimersByTime(0);
        });

        expect(result.queryByTestId('form-sign-to-esl')).toBeInTheDocument();

        expect(result.queryByTestId('form-sign-to-esl')?.querySelector('input')!)
          .toHaveValue(typedEmail);
      });
  
      it.todo(`hides error info`);
    });
  });

  describe(`communication with store`, () => {
    describe(`when loading flag is truthy`, () => {
      it(`renders with loader`, (done) => {
        const result = render(<Fixture />);

        const keepMePosted = result.queryByTestId('picker-esl-keep-me-posted');

        fireEvent.click(keepMePosted!);

        expect(result.queryByTestId('form-sign-to-esl-loader'))
          .not
          .toBeInTheDocument();

        const unsubscribe = reaction(
          () => store.isLoading,
          async (isLoading) => {
            if (!isLoading) {
              return;
            }

            await waitFor(() => {
              result.debug();
              expect(result.queryByTestId('form-sign-to-esl-loader'))
                .toBeInTheDocument();
            });

            unsubscribe();
            done();
          }
        );

        runInAction(() => {
          store.isLoading = true;
        });
      });

      it.todo(`does not allow to close notification panel`);
    });

    describe(`when there is an expected error`, () => {
      it(`renders with error message`, (done) => {
        const result = render(<Fixture />);

        const keepMePosted = result.queryByTestId('picker-esl-keep-me-posted');

        fireEvent.click(keepMePosted!);

        const errorMessage = lorem.sentence();

        const unsubscribe = reaction(
          () => store.error,
          async (error) => {
            console.log(error);

            if (!error) {
              return;
            }

            await waitFor(() => {
              expect(result.queryByText(errorMessage)).toBeInTheDocument();
            });

            unsubscribe();
            done();
          }
        );

        runInAction(() => {
          store.error = {
            message: errorMessage,
            type: 'expected'
          };
        });
      });
    });

    describe(`when input gains focus`, () => {
      it(`hides error info`, async () => {
        const result = render(<Fixture />);

        const keepMePosted = result.queryByTestId('picker-esl-keep-me-posted');

        fireEvent.click(keepMePosted!);

        const errorMessage = lorem.sentence();

        runInAction(() => {
          store.error = {
            message: errorMessage,
            type: 'expected'
          };
        });

        await waitFor(() => {
          expect(result.queryByText((errorMessage))).toBeInTheDocument();
        });

        const input = result.queryByTestId('form-sign-to-esl')?.querySelector('input')!;

        fireEvent.focus(input);

        expect(result.queryByText((errorMessage))).not.toBeInTheDocument();
      });
    });

    describe(`when there is an unexpected error`, () => {
      it.todo(`renders with modal`);

      it.todo(`does not close the notification panel`);
    });

    describe(`when data flag is truthy`, () => {
      it(`renders with success info`, (done) => {
        const result = render(<Fixture />);

        const keepMePosted = result.queryByTestId('picker-esl-keep-me-posted');

        fireEvent.click(keepMePosted!);

        const unsubscribe = reaction(
          () => store.data,
          async (data) => {
            if (!data) {
              return;
            }

            await waitFor(() => {
              expect(result.queryByText('Thank you for signing up!')).toBeInTheDocument();
            });

            unsubscribe();
            done();
          }
        );

        runInAction(() => {
          store.data = true;
        });
      });
    });
  });
});
