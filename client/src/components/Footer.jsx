import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"

const FooterComponent = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className="w-ful max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5 mr-10">
                <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
                        to-pink-500 rounded-lg text-white'>Reshma </span>
                        Crotchets
                </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                        <Footer.Title  title="FOLLOW US"/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href="https://www.instagram.com/reshmacrotchets?igsh=MWxvYmIwbm5vZG1rZw%3D%3D"
                                target="_blank"
                                rel='noepener noreferrer'>
                                Instagram
                            </Footer.Link>
                            
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title  title="ABOUT"/>
                        <Footer.LinkGroup col>
                            <Footer.Link href="/privacy-policy">
                                Privacy Policy
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider/>
            <div >
                <Footer.Copyright href='#' by="Reshma Crotchets" year={new Date().getFullYear()}/>
            </div>
        </div>

    </Footer>
  )
}
export default FooterComponent
