import mysql.connector 
def get_connection():
    return mysql.connector.connect(
        host="local host"
        user="root"
        password="website"
        database="Fasal-Bidge")
# Start Coding
# Create a database name Fasal-Bridge
# Create a seller table and a buyer table
# Starting with location
loc=int(input("Kindly write your location:"))
# For phone number
Phone=int(input("Kindly enter your phone number:"))
# Making a function that will help the user if he/she forgot their password.
def  Forgot_password():
    username=int(input("Please enter your username:"))
    con= get_connection()
    cur=con.cursor()
    cur.execute("SELECT * FROM users WHERE username=%s", (username,))
    user=cur.fetchone()
    # In order to find out whether the user is in list or not.
    if user:
        while True:
            newpassword=int(input("Please enter your new password:"))
            confirmpassword=int(input("Please comfirm your password:"))
            if newpassword==confirmpassword:
                print("Your new password is successfully stored")
                break
            else:
                print("Try again")
         # Through SQL update the new password of user
#   Making function so that user can able to login

def login():
    while True:
        print()
        choice=input("1. Login \n,2. Forgot password \n3. Exit")
        if choice.lower()=="login":
            username=int(input("Please enter your username:"))
            password=int(input("Please enter your password:"))
            # Through query will chek if this account exist in our website or not
            con=get_connection()
            cur=con.cursor()
            cur.execute("SELECT* FROM  users WHERE username=%s AND password=%s", (username, password))
            user = cur.fetchone()
            con.close()
            if user:
                print("Login successfully.Thank You")
                return True
            else:
                n=input("It seems that you have forgot your password (YES/NO):")
                if n.lower=="no":
                    print("Then try to login again")
                    break
                elif n.lower=="yes":
                    Forgot_password()
                else:
                    print()
        elif choice.lower()=="forgot password":
            Forgot_password()
        else:
            print("Thank you for your precious time")
            break


def Price_analyser():
    # have to include API for that
    print("Here is your data")
def Sell_now():
    quantity=int(input("How many crops do you want to sell"))
    for j in range(0,quantity+1):
        Crop_name=input("Enter your crop name")
        Crop_quantity=int(input("Enter how much do you want to sell:"))
        Crop_price=int(input("Enter how much will be the final price"))
        # Inserting into the tables SELL
        print("Thank you for your information")
def Farmer_ID():
     Farmer_id=int(input("Please add your Farmer ID  number :"))
def Seller():
     a=input("Do you have any previous account?(YES/NO):")
     if a.lower=="no":
        name=input("Please enter your name :")
        username =int(input("You have to enter your username means a name that should be remembered or will use everytime when you use this website"))
        password=int(input("Please make your own password which you could able to remember by you easily:"))
        # WE can add whatever we want for the verification of buyer .I am for now adding Farmer ID because it is way more common.
        Farmer_choice=input("Want ot add your Farmer ID number?(YES/NO):")
        if Farmer_choice.lower()=="Yes":
            Farmer_ID()
        else:
            print("If you will provide us  your farmer id then we will tag your verified and there are chancetaht more people will buy form you ")
            CHOICE=int("Want to add your Farmer's ID or no(YES/NO):")
            if CHOICE.lower()=="yes":
                Farmer_ID()
            elif CHOICE.lower()=="no":
                print("It's fine")
            else:
                print("invalid item")

             

        location=int(input("Please enter your full loaction which should contain state also:"))
        # making sql to get connect with the help of cursor and then inserting values
        print("Your information is stored successfully,Thank you very much .")
        login=input("Want to login ?(YES/NO):")
        if login.lower=="yes":
            login()
        elif login.lower=="no":
            print("Thank for your precious time")
        else:
            print("Wrong input")
     elif a.lower=="yes":
         login=input("Want to login ?(YES/NO):")
         if login.lower=="yes":
             login()
         else:
             print("Thank for your precious time")
     else:
        print("You have written a wrong input")
     How_many=int(input("How many types of crops do you have"))
     for i in range(0,How_many+1):
         crop_name=input("Enter your crop name :")
         crop_quantity=int(input("Enter how much quantity how have now:"))
         decision=input("What do want to do now ?\n 1.Analyse the price\n 2. Sell now\n Want to wait for some time")
         if decision.lower=="analyse the price":
             Price_analyser()
         elif decision.lower=="sell now":
             Sell_now()
         else:
             print("You can go on next if crops still left otherwise you can left turn back also")
         

def Buyer():
    a=input("Do you have any previous account?(YES/NO):")
    if a.lower=="no":
        name=input("Please enter your name :")
        username =int(input("You have to enter your username means a name that should be remembered or will use everytime when you use this website"))
        password=int(input("Please make your own password which you could able to remember by you easily:"))
        # WE can add whatever we want for the verification of buyer .I am for now adding Aadhar Number because it is way more common.
        aadhar=int(input("Please add your Aadhar card number :"))
        location=int(input("Please enter your full loaction which should contain state also:"))
        # making sql to get connect with the help of cursor and then inserting values
        print("Your information is stored successfully,Thank you very much .")
        login=input("Want to login ?(YES/NO):")
        if login.lower=="yes":
            login()
        elif login.lower=="no":
            print("Thank for your precious time")
        else:
            print("Wrong input")
    elif a.lower=="yes":
         login=input("Want to login ?(YES/NO):")
         if login.lower=="yes":
             login()
         else:
             print("Thank for your precious time")
    else:
        print("You have written a wrong input")
    product=int(input("What would you to order?:"))
    # Through SQl writing a query that will show which farmers have that crop
    cursor.execute(query,(product))
    result=cursor.fetchone()
    if result is None:
        print("Sorry,none of the farmers has ",product)
    else:
        #  show  farmers name ,their final price ,whether they are verified or not through sql
        print("Here you go")
        choose=input("Choose your farmer ")
        customer_quantity=int(input("How much you want?:"))
        print("Thank you for choosing .")
        # Inserting into the tables BUY
                                                                             

    



option=input("What would like to do ? (BUY/SELL):")
if option.lower== "buy":
    Buyer()
else:
    Seller()



