<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>EU Search</title>
    
    
    <script src="main.js" type="text/javascript"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>

</head>
<body>
    <h1>EU Country search php</h1>
    <table>
        <tr>
            <td><label>Name: </label></td>
            <td><input id="nameInput" name="nameInput" type="text" /></td>
        </tr>
        <tr>
            <td><label>Full Name: </label></td>
            <td><input type="text" /></td>
        </tr>
        <tr>
            <td><label>Code: </label></td>
            <td><input type="text" /></td>
        </tr>
        <tr>
            <td></td>
            <td>
                <input type="button" value="Search" onclick="window.alert('button clickeds');" />
            </td>
        </tr>
    </table>
    <div class="results"></div>
    <div class="error">
    </div>
</body>
</html>