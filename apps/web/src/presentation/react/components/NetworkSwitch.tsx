import { ComponentProps, MutableRefObject, ReactNode, useState } from 'react'
import { Menu } from './Menu'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import { CheckMarkIcon } from './icons/CheckMark'
import { Chevron } from './icons/Chevron'
import React from 'react'

type Props = {
  className?: string
  networks: string[]
  selectedNetwork: string
  selectNetwork: (value: string) => void
}

const MenuContainer = ({
  children,
  refProp,
  className,
  ...props
}: {
  refProp: React.RefObject<HTMLDivElement> | MutableRefObject<HTMLDivElement>;
} & ComponentProps<'div'>) => (
  <div
    {...props}
    className={`cursor-pointer rounded-lg p-2 h-10 bg-neutral-100 flex items-center justify-center ${className ?? ''}`}
    ref={refProp}
  >
    {children}
  </div>
);

const ItemText = ({
  selected = false,
  text = ''}) => (
  <span
    className={`text-base font-medium capitalize transition-colors duration-300
      group-hover/item:text-[#1A1B23] ${
        selected ? 'text-neutral-950' : 'text-[#1A1B23]'
      }`}
  >
    {text}
  </span>
)

const Row = (props: ComponentProps<'div'>) => (
  <div className="flex items-center gap-x-2" {...props} />
)

export const NetworkSwitch = function ({
  className,
  networks,
  selectedNetwork,
  selectNetwork
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOnClickOutside<HTMLDivElement>(() => setIsOpen(false))

  const onChange = function (network: string) {
    selectNetwork(network)
    setIsOpen(false)
  }

  return (
    <MenuContainer
      className={className}
      onClick={() => setIsOpen(true)}
      refProp={ref}
    >
      <div className="relative">
        <Row onClick={() => setIsOpen(!isOpen)}>
          <ItemText selected={isOpen} text={selectedNetwork} />
          {isOpen ? (
            <Chevron.Up className="ml-auto text-[#1A1B23]" />
          ) : (
            <Chevron.Bottom className="ml-auto text-[#1A1B23]" />
          )}
        </Row>
        {isOpen && (
          <div className="absolute right-0 top-0 z-50 translate-x-2 translate-y-9">
            <Menu
              items={networks.map(function (network) {
                const selected = network === selectedNetwork
                return {
                  content: (
                    <button
                      className={`flex items-center gap-x-2 ${
                        selected ? 'text-neutral-950' : ''
                      }`}
                      disabled={selected}
                      onClick={function (e) {
                        e.stopPropagation()
                        onChange(network)
                      }}
                    >
                      <span className="capitalize">{network}</span>
                      <div className={selected ? 'block' : 'invisible'}>
                        <CheckMarkIcon className="[&>path]:stroke-emerald-500" />
                      </div>
                    </button>
                  ),
                  id: network,
                }
              })}
            />
          </div>
        )}
      </div>
    </MenuContainer>
  )
}
