'use client'

import { useFormStatus } from 'react-dom/'

import { LoadingButton } from '../../../../ui/src/loading-button'

export type Props = React.ComponentPropsWithoutRef<'button'>

const SubmitButton: React.FC<Props> = ({ children, ...props }) => {
  const { pending } = useFormStatus()

  return (
    <LoadingButton isLoading={pending} type="submit" {...props}>
      {children}
    </LoadingButton>
  )
}

export default SubmitButton
