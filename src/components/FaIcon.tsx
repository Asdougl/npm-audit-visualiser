import { IconName, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface FaIconProps {
  icon: IconName
  size?: SizeProp
  spin?: boolean
  fixedWidth?: boolean
  className?: string
}

export const FaIcon = ({
  icon,
  size,
  spin,
  fixedWidth = true,
  className,
}: FaIconProps) => {
  return (
    <FontAwesomeIcon
      icon={['fat', icon]}
      size={size}
      spin={spin}
      fixedWidth={fixedWidth}
      className={className}
    />
  )
}
