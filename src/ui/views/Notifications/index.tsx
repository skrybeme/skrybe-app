import React from 'react';
import { PickerESL_VariantA as PickerESL } from '@/ui/domain-components/PickerESL';
import { useToggle } from '@/ui/hooks';
import { observer } from 'mobx-react-lite';

export const Notifications = observer((): React.ReactElement => {
  const popover = useToggle(false);
  const [triggerDisabled, setTriggerDisabled] = React.useState(true);
  
  React.useEffect(() => {
    const timeout = setTimeout(popover.toggle, 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setTriggerDisabled(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  return (
    <PickerESL
      popover={popover}
      triggerDisabled={triggerDisabled}
    />
  );
});
