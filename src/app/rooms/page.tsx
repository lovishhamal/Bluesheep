import { Metadata } from "next";
import { motion } from "framer-motion";
import {
  HomeIcon,
  WifiIcon,
  ViewfinderCircleIcon,
  EyeIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Luxury Rooms & Suites - Blue Sheep Hotel Dunai, Phoksundo",
  description:
    "Experience luxury accommodation in Dunai, Phoksundo. Our rooms offer stunning mountain views, modern amenities, and exceptional comfort. Book your perfect stay today.",
  keywords: [
    "hotel rooms Dunai",
    "luxury accommodation Phoksundo",
    "mountain view rooms",
    "hotel suites Dunai",
    "Phoksundo hotel rooms",
    "Blue Sheep Hotel rooms",
  ],
};

export default function RoomsPage() {
  const rooms = [
    {
      name: "Deluxe Mountain View Room",
      price: "$120/night",
      description:
        "Spacious room with panoramic mountain views and modern amenities",
      features: [
        "Mountain View",
        "Free WiFi",
        "Air Conditioning",
        "Private Bathroom",
        "Room Service",
      ],
      image: "/room-1.jpg",
    },
    {
      name: "Executive Suite",
      price: "$180/night",
      description:
        "Luxurious suite with separate living area and premium amenities",
      features: [
        "Mountain View",
        "Free WiFi",
        "Air Conditioning",
        "Private Bathroom",
        "Room Service",
        "Mini Bar",
        "Balcony",
      ],
      image: "/room-2.jpg",
    },
    {
      name: "Presidential Suite",
      price: "$250/night",
      description:
        "Our most luxurious accommodation with stunning views and premium services",
      features: [
        "Mountain View",
        "Free WiFi",
        "Air Conditioning",
        "Private Bathroom",
        "Room Service",
        "Mini Bar",
        "Balcony",
        "Butler Service",
      ],
      image: "/room-3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold font-playfair mb-6"
          >
            Luxury Rooms & Suites
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Experience unparalleled comfort and stunning mountain views in our
            beautifully appointed rooms and suites in Dunai, Phoksundo.
          </motion.p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  <p className="text-gray-600">Room Image</p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {room.name}
                    </h3>
                    <span className="text-2xl font-bold text-blue-600">
                      {room.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <ul className="space-y-2 mb-6">
                    {room.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-playfair mb-6">
              Room Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every room is equipped with modern amenities to ensure your
              comfort and convenience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: WifiIcon,
                title: "Free WiFi",
                description: "High-speed internet access",
              },
              {
                icon: ViewfinderCircleIcon,
                title: "Mountain Views",
                description: "Panoramic Himalayan views",
              },
              {
                icon: HomeIcon,
                title: "Premium Beds",
                description: "Luxury bedding and mattresses",
              },
              {
                icon: EyeIcon,
                title: "Scenic Views",
                description: "Stunning Phoksundo Lake views",
              },
            ].map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <amenity.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {amenity.title}
                </h3>
                <p className="text-gray-600">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
