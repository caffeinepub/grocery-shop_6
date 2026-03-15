import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Product = {
    name : Text;
    category : Text;
    price : Nat;
    quantity : Nat;
    isAvailable : Bool;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  type ShopInfo = {
    name : Text;
    location : Text;
    contact : Text;
  };

  let productCatalog = Map.empty<Text, Product>();
  var shopInfo : ?ShopInfo = null;

  public shared ({ caller }) func addOrUpdateProduct(
    name : Text,
    category : Text,
    price : Nat,
    quantity : Nat,
    isAvailable : Bool,
  ) : async () {
    let product : Product = {
      name;
      category;
      price;
      quantity;
      isAvailable;
    };
    productCatalog.add(name, product);
  };

  public shared ({ caller }) func updateProductAvailability(name : Text, isAvailable : Bool) : async () {
    switch (productCatalog.get(name)) {
      case (null) {};
      case (?product) {
        let updatedProduct = { product with isAvailable };
        productCatalog.add(name, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func updateProductQuantity(name : Text, quantity : Nat) : async () {
    switch (productCatalog.get(name)) {
      case (null) {};
      case (?product) {
        let updatedProduct = { product with quantity };
        productCatalog.add(name, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func setShopInfo(name : Text, location : Text, contact : Text) : async () {
    shopInfo := ?{
      name;
      location;
      contact;
    };
  };

  public query ({ caller }) func getProduct(name : Text) : async ?Product {
    productCatalog.get(name);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    productCatalog.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let productsIter = productCatalog.values();
    productsIter.filter(func(p) { p.category == category }).toArray().sort();
  };

  public query ({ caller }) func getShopInfo() : async ?ShopInfo {
    shopInfo;
  };
};
