function MenuSelection()
{
    if (document.getElementById("menu").value == "Category List")
    {
        document.getElementById("catlist").style.visibility = "visible";
        document.getElementById("addcat").style.visibility = "hidden";
        document.getElementById("changedesc").style.visibility = "hidden";
        document.getElementById("deletecat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Add a Product Category")
    {
        document.getElementById("catlist").style.visibility = "hidden";
        document.getElementById("addcat").style.visibility = "visible";
        document.getElementById("changedesc").style.visibility = "hidden";
        document.getElementById("deletecat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change a Category Description")
    {
        document.getElementById("catlist").style.visibility = "hidden";
        document.getElementById("addcat").style.visibility = "hidden";
        document.getElementById("changedesc").style.visibility = "visible";
        document.getElementById("deletecat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete a Product Category")
    {
        document.getElementById("catlist").style.visibility = "hidden";
        document.getElementById("addcat").style.visibility = "hidden";
        document.getElementById("changedesc").style.visibility = "hidden";
        document.getElementById("deletecat").style.visibility = "visible";
        document.getElementById("about").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "About")
    {
        document.getElementById("catlist").style.visibility = "hidden";
        document.getElementById("addcat").style.visibility = "hidden";
        document.getElementById("changedesc").style.visibility = "hidden";
        document.getElementById("deletecat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "visible";
    }
}

function GenCategories()
{
    var catRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    //Checks that the object has returned data
    catRequest.onreadystatechange = function()
    {
        if (catRequest.readyState == 4 && catRequest.status == 200)
        {
            var output = JSON.parse(catRequest.responseText);
            
            CatOutput(output);
        }
    }
    
    //Initiate the server request
    catRequest.open("GET", url, true);
    catRequest.send();
}

function CatOutput(result)
{
    
    var table = "";
    table += "<table border='1' cellpadding = '5' align = 'center'>";
    
    table += "<tr>";
            table += "<td><u><b>Cateogry ID</u></b></td>";
            table += "<td><u><b>Category Name</u></b></td>";
            table += "<td><b><u>Category Description</u></b></td>";
    table += "</tr>";

    
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
    
    table += "<tr>";
            table += "<td>" + result.GetAllCategoriesResult[count].CID + "</td>";
            table += "<td>" + result.GetAllCategoriesResult[count].CName + "</td>";
            table += "<td>" + result.GetAllCategoriesResult[count].CDescription + "</td>";
    table += "</tr>";            
                
    }
    
    table += "</table>";
    document.getElementById("cattable").innerHTML = table;
}

function AddCategory()
{
    var addprompt = confirm("Are you sure you want to add this category?");
    if (addprompt == true)
    {
        
        //create URL and query string
        var addRequest = new XMLHttpRequest();
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
        
        //get inputted customer information
        var categoryname = document.getElementById("catnewname").value;
        var categorydesc = document.getElementById("catnewdesc").value;
        
        //create new customer variable in service format
        var newcategory = '{"CName":"' + categoryname + '","CDescription":"' + categorydesc + '"}';
        
        //loop to get response object
        addRequest.onreadystatechange = function()
        {
            if (addRequest.readyState == 4 && addRequest.status == 200)
            {
                var cat = JSON.parse(addRequest.responseText);
                NewCatResult(cat);
            }
        }
        
        addRequest.open("POST",url,true);
        addRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        addRequest.send(newcategory);
    }
    else
    {
        return;
    }
}

function NewCatResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("addcatoutput").innerHTML = "The operation was successful.";
    }
    else
    {
        document.getElementById("addcatoutput").innerHTML = "The operation failed." + "<br><br>" + output.Exception;
    }
}

function ChangeDescription()
{
    var descprompt = confirm("Are you sure you want to change this information?");
    if (descprompt == true)
    {
        //create URL and query string
        var descRequest = new XMLHttpRequest();
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
        
        //get inputted updated customer info
        var catid = document.getElementById("catid").value;
        var catnewdesc = document.getElementById("catchangedesc").value;
        
        //pass updated customer info to service
        var changedesc = '{"CID":"' + catid + '","CDescription":"' + catnewdesc + '"}';
        
        //loop to get response object
        descRequest.onreadystatechange = function()
        {
            if (descRequest.readyState == 4 && descRequest.status == 200)
            {
                var descresult = JSON.parse(descRequest.responseText);
                DescResult(descresult);
            }
        }
        
        descRequest.open("POST",url,true);
        descRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        descRequest.send(changedesc);    
    }
    else
    {
        return;    
    }
}

function DescResult(display)
{
    if (display.WasSuccessful == 1)
    {
        document.getElementById("changedescoutput").innerHTML = "The description information has been changed for category " + document.getElementById("catid").value;
    }
    else if (display.WasSuccessful == 0)
    {
        document.getElementById("changedescoutput").innerHTML = "The operation failed due to an unspecified error." + "<br><br>" + display.Exception;
    }
    else if (display.WasSuccessful == -2)
    {
        document.getElementById("changedescoutput").innerHTML = "Error in input information." + "<br><br>" + display.Exception;
    }
    else if (display.WasSuccessful == -3)
    {
        document.getElementById("changedescoutput").innerHTML = "That category ID does not exist.";
    }
}

function DeleteCategory()
{
    var delprompt = confirm("Are you sure you want to delete this category?");
    if (delprompt == true)
    {
        
        //create URL and query string
        var delRequest = new XMLHttpRequest();
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
        url += document.getElementById("catdelid").value;
        
        //loop to get response object
        delRequest.onreadystatechange = function()
        {
            if (delRequest.readyState == 4 && delRequest.status == 200)
            {
                var delresult = JSON.parse(delRequest.responseText);
                DelResult(delresult);
            }
        }
        
        delRequest.open("GET",url,true);
        delRequest.send();
    }
    else
    {
        return;
    }
}

function DelResult(show)
{
    if (show.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("deletecatoutput").innerHTML = "The operation was successful.";
    }
    else
    {
        document.getElementById("deletecatoutput").innerHTML = "The operation failed." + "<br><br>" + show.Exception;
    }
}