import Link from "next/link";
import Image from "next/image";
import { 
    FaGithub,
    FaFacebook, 
    FaTwitter, 
    FaInstagram, 
    FaYoutube, 
    FaLinkedin, 
    FaPinterest,
    FaLocationArrow,
    FaPhone,
    FaPrint,
    FaDiscord
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="p-15 pb-6 bg-[#F7EDD9] mt-25">
            <hr />
                <div className="flex justify-between p-2 mx-20">
                    <div className="items-center">
                        <Image
                            width={300}
                            height={300}
                            src={"/favicon.png"}
                            alt="NFT Marketplace"
                        />
                    </div>
                    <div className="mt-25 items-center w-129">
                        <div className="flex justify-center items-center space-x-4">
                            <FaLocationArrow size={22}/>
                            <p>
                                <em>
                                    Village Ait Hamidouche Commune de Boudjima Wilaya de Tizi Ouzou
                                </em>
                            </p>
                        </div>
                        <div className="flex justify-between mt-5">
                            <div className="flex space-x-4">
                                <FaPhone size={22}/>
                                <p>+213 656 39 96 80 </p>
                            </div>
                            <div className="flex space-x-4">
                                <FaPrint size={22}/>
                                <p>+213 656 39 96 80 </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-5">
                            <p>Social Media</p>
                            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook size={20} />
                            </Link>
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter size={20} />
                            </Link>
                            <Link href="https://linkedin.com/in/lyes-boudjabout" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size={20} />
                            </Link>
                            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube size={20} />
                            </Link>
                            <Link href="https://github.com/Lyes-Boudjabout" target="_blank" rel="noopener noreferrer">
                                <FaGithub size={20} />
                            </Link>
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={20} />
                            </Link>
                            <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
                                <FaDiscord size={20} />
                            </Link>
                            <Link href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                                <FaPinterest size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            <hr />
            <div className="flex justify-between mt-5 text-gray-800">
                <div className="flex space-x-10 w-1/3">
                    <p>
                        <Link href="/">
                            Marketplace
                        </Link>
                    </p>
                    <p>
                        <Link href="/cake-nft">
                            Cake NFT Bakery
                        </Link>
                    </p>
                    <p>
                        <Link href="/list-nft">
                            List NFT
                        </Link>
                    </p>
                    <p>
                        <Link href="/">
                            Recently Listed NFT
                        </Link>
                    </p>
                </div>
                <div>
                    <p>Copyright ©️ 2025 • NFT Marketplace Inc.</p>
                </div>
            </div>
        </footer>
    )
}