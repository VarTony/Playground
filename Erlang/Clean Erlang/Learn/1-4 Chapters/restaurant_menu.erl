-module(restaurant_menu).

% Work with lists

RestaurantMenu = [{ water, 0.75 }, {beer, 1.25}, {juice, 1.05}, {cream_cake, 2.35}, {chocolate_cake, 2.37}].
ClientOrder = [{Item, Price * 1.07} || {Item, Price } <- RestaurantMenu, Price >= 0.88].