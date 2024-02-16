import { ResizablePanel, ScrollArea } from '@janhq/joi'

import ThreadTitle from './ThreadTitle'

const ThreadBody = () => {
  return (
    <ResizablePanel
      minSize={40}
      defaultSize={50}
      order={2}
      id="ThreadBodyPanel"
    >
      <ScrollArea className="h-full w-full">
        <ThreadTitle />
        <div className="p-4">
          {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => {
            return (
              <p key={x}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                suscipit repudiandae tenetur quam, maiores delectus. Consequatur
                officiis repellat ipsam excepturi tenetur quae earum
                consectetur! Animi illum non maxime nisi doloribus.
              </p>
            )
          })} */}
        </div>
      </ScrollArea>
    </ResizablePanel>
  )
}

export default ThreadBody
