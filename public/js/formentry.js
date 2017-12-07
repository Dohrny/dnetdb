var badName =/[*|\":<>[\]{}!`\\();@&$0-9_\s]/;
      function validate(form)
      {
        fail  = validateForename(form.forename.value)
        fail += validateSurname(form.surname.value)
        fail += validateEmail(form.email.value)
        fail += validateRole(form.role.value)

        if   (fail == "")   return true
        else { alert(fail); return false }
      }
	  function validateForename(field)
      {
        if (field == "")
        {
            return "No First Name was entered.\n"
        }
        else if (badName.test(field))
        {
            return "A character in your first name is not allowed. sorry bro\n"
        }
        else return ""
        
      }

      function validateSurname(field)
      {
        if (field == "")
        {
            return "No Last Name was entered.\n"
        }
        else if (badName.test(field))
        {
            return "A character in your last name is not allowed. sorry bro\n"
        }
        else return ""
      }

        function validateEmail(field)
        {
        var pattern = [
            /^\w+@\bmsbcollege\.edu\b$/,
            /^\w+@\bglobeuniversity\.edu\b$/,
            /^\w+@\bstudents.msbcollege\.edu\b$/,
            /^\w+@\bstudents.globeuniversity\.edu\b$/
        ];
        
        if (field == "") return "No Email was entered.\n"
        else if (pattern[0].test(field))
        {
            return ""
        }
        else if (pattern[1].test(field))
        {
            return ""
        }
        else if (pattern[2].test(field))
        {
            return ""
        }else if (pattern[3].test(field))
        {
            return ""
        }
        else return "Invalid Email.\n"
        }

        function validateRole(field)
        {
            return ""
        }