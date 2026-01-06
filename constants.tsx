
import React from 'react';

export const CATEGORIES = [
  { id: 'restaurants', name: 'مطاعم', icon: 'fa-utensils', color: 'bg-red-500' },
  { id: 'hotels', name: 'فنادق', icon: 'fa-hotel', color: 'bg-blue-500' },
  { id: 'stores', name: 'متاجر', icon: 'fa-shopping-bag', color: 'bg-green-500' },
  { id: 'tech', name: 'شركات تقنية', icon: 'fa-laptop-code', color: 'bg-indigo-500' },
  { id: 'pharmacy', name: 'صيدليات', icon: 'fa-pills', color: 'bg-emerald-500' },
  { id: 'hospitals', name: 'مشافي', icon: 'fa-hospital', color: 'bg-rose-500' },
  { id: 'gyms', name: 'نوادي رياضية', icon: 'fa-dumbbell', color: 'bg-orange-500' },
  { id: 'freelance', name: 'خدمات فريلانسر', icon: 'fa-user-tie', color: 'bg-purple-500' },
  { id: 'supermarket', name: 'سوبر ماركت', icon: 'fa-shopping-cart', color: 'bg-yellow-500' },
  { id: 'cars', name: 'ورشات سيارات', icon: 'fa-car', color: 'bg-slate-600' },
];

export const MOCK_PROJECTS = [
  {
    id: 'p1',
    ownerId: 'o1',
    name: 'مطعم الشام الأصيل',
    logo: 'https://picsum.photos/200/200?random=1',
    description: 'أشهى المأكولات الشرقية والغربية في قلب المدينة.',
    category: 'restaurants',
    location: 'دمشق - المزة',
    lat: 33.5138,
    lng: 36.2765,
    services: ['جلسات خارجية', 'واي فاي مجاني'],
    workingHours: '12:00 PM - 12:00 AM',
    deliveryOption: true,
    rating: 4.8,
    reviewsCount: 156
  },
  {
    id: 'p2',
    ownerId: 'o2',
    name: 'صيدلية النور المناوبة',
    logo: 'https://picsum.photos/200/200?random=2',
    description: 'كافة الأدوية والمستلزمات الطبية على مدار الساعة.',
    category: 'pharmacy',
    location: 'حلب - الجميلية',
    lat: 36.2021,
    lng: 37.1343,
    services: ['توصيل منزلي', 'قياس ضغط'],
    workingHours: '24/7',
    deliveryOption: true,
    rating: 4.5,
    reviewsCount: 89
  }
];

export const MOCK_PRODUCTS = [
  {
    id: 'it1',
    projectId: 'p1',
    name: 'شاورما دجاج عائلي',
    image: 'https://picsum.photos/400/300?random=10',
    description: 'وجبة تكفي 4 أشخاص مع المقبلات والبطاطا.',
    price: 150000,
    available: true
  },
  {
    id: 'it2',
    projectId: 'p1',
    name: 'كبة لبنية',
    image: 'https://picsum.photos/400/300?random=11',
    description: 'طبق تقليدي محضر بأجود أنواع اللحم واللبن.',
    price: 85000,
    available: true
  }
];
