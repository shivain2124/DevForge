'use client';;
import * as React from 'react';
import { motion } from 'motion/react';
import {
  TabGroup as TabGroupPrimitive,
  TabList as TabListPrimitive,
  Tab as TabPrimitive,
  TabPanels as TabPanelsPrimitive,
  TabPanel as TabPanelPrimitive,
} from '@headlessui/react';

import { cn } from '@/lib/utils';
import {
  MotionHighlight,
  MotionHighlightItem,
} from '@/components/animate-ui/effects/motion-highlight';

function TabGroup(
  {
    className,
    ...props
  }
) {
  return (
    <TabGroupPrimitive
      data-slot="tab-group"
      className={cn('flex flex-col gap-2', className)}
      {...props} />
  );
}

function TabList(
  {
    children,
    className,
    activeClassName,

    transition = {
      type: 'spring',
      stiffness: 200,
      damping: 25,
    },

    ...props
  }
) {
  return (
    <TabListPrimitive
      data-slot="tab-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-lg p-[4px]',
        className
      )}
      {...props}>
      {(bag) => (
        <MotionHighlight
          controlledItems
          className={cn('rounded-sm bg-background shadow-sm', activeClassName)}
          value={bag.selectedIndex.toString()}
          transition={transition}>
          {typeof children === 'function' ? children(bag) : children}
        </MotionHighlight>
      )}
    </TabListPrimitive>
  );
}

function Tab(props) {
  const { children, className, index, as = 'button', ...rest } = props;

  return (
    <MotionHighlightItem value={index.toString()} className="size-full">
      <TabPrimitive
        data-slot="tabs-trigger"
        className={cn(
          'inline-flex cursor-pointer items-center size-full justify-center whitespace-nowrap rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:text-foreground z-[1]',
          className
        )}
        as={as}
        {...rest}>
        {children}
      </TabPrimitive>
    </MotionHighlightItem>
  );
}

function TabPanel(props) {
  const {
    className,
    as = motion.div,
    transition = {
      duration: 0.5,
      ease: 'easeInOut',
    },
    ...rest
  } = props;

  return (
    <TabPanelPrimitive
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      layout
      initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
      transition={transition}
      as={as}
      {...rest} />
  );
}

function TabPanels(props) {
  const {
    children,
    className,
    as = motion.div,
    transition = { type: 'spring', stiffness: 200, damping: 25 },
    ...rest
  } = props;
  const containerRef = React.useRef(null);

  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const newHeight = entries[0]?.contentRect.height ?? 0;
      requestAnimationFrame(() => {
        setHeight(newHeight);
      });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      const initialHeight = containerRef.current.getBoundingClientRect().height;
      setHeight(initialHeight);
    }
  }, [children]);

  return (
    <TabPanelsPrimitive
      data-slot="tabs-contents"
      layout
      animate={{ height: height }}
      transition={transition}
      as={as}
      className={className}
      {...rest}>
      <div ref={containerRef}>{children}</div>
    </TabPanelsPrimitive>
  );
}

export { TabGroup, TabList, Tab, TabPanel, TabPanels };
