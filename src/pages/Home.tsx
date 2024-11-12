import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const Home = ({}) => {
    return (
    <>
        <h1 className="text-xl font-bold underline">Ernesto Perez</h1>
        <h2>Hey there, my name is Ernesto Perez and I'm a experieced software engineer. I work as a consultant helping companies to:</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Deliver projects</AccordionTrigger>
            <AccordionContent>
            Do you have problems delivering projects? Everything seems ok but when the moment comes nothing is released to production? 
          Good news! I can help, I will talk to everyone to make sure that the project has a clear way forward to be on production as soon as possible.
          There may be compromises in the scope and in other areas but if you want this project deliver I will make that possible. I have a 99% rate of 
          success in all the projects I have worked on.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Solving complex challenges</AccordionTrigger>
            <AccordionContent>
            Do you have a system that is too complicated that every new feature takes ages in being completed. I can help simplyfing project, 
            analysing what is important and what not and helping to refactor the code to remove all the unnecessary complexity.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Modernize development practices</AccordionTrigger>
            <AccordionContent>
            Are you tired or managing every resource or every build and deployment manually? I can help to automate all the infrastructure provisioning 
            and keep it updated, I will help to build automated CI/CD pipelines so the proccess of releasing new featues to production will be done with minimum risk.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Full stack development</AccordionTrigger>
            <AccordionContent>
            Real full stack development, from infrastructure to delivery, from solution architecture to project management. Not just the programming and/or testing.
           Full software development cycle!! If I have to work in a different technology to make the project success, there I will be, if I have to step in to takes
           a leadership role and talk to stakeholder, there I will be. If I have to do some manual testing there I will be.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    )
}

export default Home