<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Q10 | Quiz Prelims</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"
        integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        #bg {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: url('../assets/aestheticbg.png');
            /* filter:saturate(0%); */
            background-size: cover;
            border-radius: 0;
            overflow-x: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content1 {
            position: relative;
            /* background: rgb(0,0,0); */
            background: linear-gradient(311deg, rgba(0, 0, 0, .2) 0%, rgba(255, 255, 255, .2) 51%, rgba(255, 255, 255, .2) 100%);
            width: 90vw;
            height: 90vh;
            min-width: 800px;
            min-height: 400px;
            border-radius: 25px;
            border: 2px solid rgba(255, 255, 255, 0.295);
            /* background: linear-gradient(white ); */
            backdrop-filter: blur(7px);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        textarea {
            margin: 20px;
            font-size: 5rem;
            border-radius: 50px;
            border: 2px solid rgba(255, 255, 255, 0.397);
            background-color: rgba(240, 248, 255, 0.288);
            padding-left: 2rem;
            width: 90%;
            height: 6rem;
            transition: .2s ease-in;
            /* word-wrap: break-word;
             word-break: break-all; */
            /* height: 80px; */
        }

        form {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .sui {
            height: 90%;
            margin-top: 0;
            font-size: 2rem;
            background-color: black;
            color: lime;
        }
    </style>
</head>

<body>
    <div id="bg">
        <div class="content1">
            <form name="form" action="" method="post">
                <textarea wrap="soft" name="data" oninput="allahhuakbar()"></textarea>
                <?php
                if (!isset($_POST['data'])) {
                    echo '<button type="submit">OK</button>';
                }
                ?>
            </form>
        </div>



    </div>


</body>
<script defer>
    function allahhuakbar(x) {
        input = document.getElementsByTagName('textarea')[0];
        console.log(x)
        if (x.toLowerCase() == "oppenheimer") {
            input.classList.add("sui");

            input.disabled="true";
            input.value = "01001110 01101111 01110111 00100000 01001001 00100000 01100001 01101101 00100000 01100010 01100101 01100011 01101111 01101101 01100101 00100000 01000100 01100101 01100001 01110100 01101000 00101100 00100000 01110100 01101000 01100101 00100000 01100100 01100101 01110011 01110100 01110010 01101111 01111001 01100101 01110010 00100000 01101111 01100110 00100000 01110111 01101111 01110010 01101100 01100100 01110011 00101110";
            // input.style.height="90";
            // input.style.marginTop="0";
            // input.style.fontSize="2rem";
            // input.style.color="lime";
            // input.style.backgroundColor="black";
        }
    }


</script>
<?php
if (isset($_POST['data'])) {
    echo '<script>allahhuakbar("' . $_POST["data"] . '");</script>';
}
?>

</html>