import Sw1 from "../img/sw1.png"
import T1 from "../img/t1.png"
import Vp1 from "../img/vp1.png"
import Mg1 from "../img/mg1.png"

export const heroData = [
    
    {id: 1, name: 'Black Tea', desc:'Darjeeling tea orthodox flavor', price:10, imgSrc:T1},
    {id: 2, name: 'Grilled Sandwich', desc:'Butter toasted bread, cheese and mayo', price:30, imgSrc:Sw1},
    {id: 3, name: 'Veg Pops', desc:'Deep fried coated vegetable chunks', price:40, imgSrc:Vp1},
    {id: 4, name: 'Veg Noodles', desc:'Dry fried ramen noodles', price:50, imgSrc:Mg1}
];

export const categories = [
    {id: 1, name: "Drinks", urlParamName:"drinks"},
    {id: 2, name: "Snacks", urlParamName:"snacks"},
    {id: 3, name: "Sweets", urlParamName:"sweets"},
    {id: 4, name: "Special", urlParamName:"special"}
];