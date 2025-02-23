Feature: Ecommerce test validation after Xray Configuration

@Regression
  Scenario Outline: Placing the order1
  Given a login to ecommerce application with "<userName>" and "<password>"
  When Add "<productName>" to cart
  Then Verify "<productName>" is displayed on the cart
  When Enter valid details and Place the order
  Then Verify order is present in Orderhistory

Examples: 
| userName           | password     | productName     |
| gshveta7@gmail.com | Parnika@0520 | ZARA COAT 3     |
| gshveta7@gmail.com | Parnika@0520 | ADIDAS ORIGINAL |

@single
 Scenario Outline: Placing the order2
  Given a login to ecommerce application with "<userName>" and "<password>"
  When Add "<productName>" to cart
  Then Verify "<productName>" is displayed on the cart
  When Enter valid details and Place the order
  Then Verify order is present in Orderhistory

Examples: 
| userName           | password     | productName     |
| gshveta7@gmail.com | Parnika@0520 | IPHONE 13 PRO   |






