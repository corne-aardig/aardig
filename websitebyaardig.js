// ASCII art logo display script
// Using monospace font to preserve formatting
const logo = String.raw`                                                                                                %%%%%%%%%     %%%%%%%%%                               
                                                                                                %%%%%%%%%     %%%%%%%%%                               
                                                                                                %%%%%%%%%     %%%%%%%%%                               
                                                                                                %%%%%%%%%     %%%%%%%%%                               
         @%%%%%%@                    @@%%%%%%@                                         %%%%@    %%%%%%%%%                           @%@               
    @%%%%%%%%%%%%%%%%            %%%%%%%%%%%%%%%%%        @%%%%%%%%  @%%%%%%      @%%%%%%%%%%%  %%%%%%%%%     %%%%%%%%%        %%%%%%%%%%%% %%%%%%%%%%
  %%%%%%%%%%%%%%%%%%%%%        %%%%%%%%%%%%%%%%%%%%%      @%%%%%%%% %%%%%%%%     %%%%%%%%%%%%%%@%%%%%%%%%     %%%%%%%%%      @%%%%%%%%%%%%%%%%%%%%%%%%
 %%%%%%%%%%%%%%%%%%%%%%%      %%%%%%%%%%%%%%%%%%%%%%%     @%%%%    %%%%%%%%%    %%%%%%%%%%%%%%%%     %%%%     %%%%%%%%%     %%%%%%%%%%%%%%%%%%%%%%%%%%
@%%%%%%%%%%@   %%%%%%%%%%    %%%%%%%%%%%@  @%%%%%%%%%%    @%%     %%%%%%%%%%   %%%%%%%%%%%%@%%%%%     %%%     %%%%%%%%%    @%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%      %%%%%%%%%    %%%%%%%%%%     @%%%%%%%%%    @%%@    %%%%%%%%%%  @%%%%%%%%%%      %%%   %%%%     %%%%%%%%%    %%%%%%%%%%@     %%%%%%%%%%%
         %%%%%%%%%  %%%%%             @%%%%%%%@  %%%%%    @%%%%%%%%%%%        %%%%%%%%%%       %%%%%%%%%%     %%%%%%%%%    %%%%%%%%%%       %%%%%%%%%%
   @%%%%%%%%%%%%%     %%%       %%%%%%%%%%%%%     %%%%    @%%%%%%%%%%         %%%%%%%%%%        %%%%%%%%%     %%%%%%%%%    %%%%%%%%%%       %%%%%%%%%%
 %%%%%%%%%%%%%%%    @%%%%     %%%%%%%%%%%%%%%    %%%%%    @%%%%%%%%%          %%%%%%%%%%        %%%%%%%%%     %%%%%%%%%    %%%%%%%%%%       %%%%%%%%%%
%%%%%%%%%%%%%   @%%%%%%%%    %%%%%%%%%%%%%   %%%%%%%%%    %%%%%%%%%%          %%%%%%%%%%       %%%%%%%%%%     %%%%%%%%%    %%%%%%%%%%       %%%%%%%%%%
%%%%%%%%%%      %%%%%%%%%   %%%%%%%%%%      %%%%%%%%%%    %%%%%%%%%%          %%%%%%%%%%%      %%%%%%%%%%     %%%%%%%%%    %%%%%%%%%%%%% @%%%%@  %%%%%
%%%%%%%%%%@   %%%%%%%%%%%   @%%%%%%%%%%    %%%%%%%%%%%    %%%%%%%%%%           %%%%%%%%%%%% %%%%%%%%%%%%%     %%%%%%%%%     %%%%%%%%%%%%%%%%%     %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%    %%%%%%%%%%%%%%%%%%%%%%%%%    %%%%%%%%%%           %%%%%%%%%%%%%%%%%%%%%%%%%%     %%%%%%%%%      %%%%%%%%%%%%%%%@     %%%%
@%%%%%%%%%%%%%%%%%%%%%%%%%   @%%%%%%%%%%%%%%%%%%%%%%%%    %%%%%%%%%%            %%%%%%%%%%%%%%%%%%%%%%%%%     %%%%%%%%%       @%%%%%%%%%%%%@@%%%%%%%%%
  %%%%%%%%%%%%% @%%%%%%%%%    @%%%%%%%%%%%%% %%%%%%%%%%   %%%%%%%%%%              %%%%%%%%%%%%% %%%%%%%%%     %%%%%%%%%          @%%%%%%%   %%%%%%%%%%
    @%%%%%%%     %%%%%%%%%       %%%%%%@@    @%%%%%%%%%    %%%%%%%%%                 %%%%%%%%   %%%%%%%%%     %%%%%%%%%    @%%%%%%%%%       %%%%%%%%%%
                                                                                                                           @%%%%%%%%%%     %%%%%%%%%%@
                                                                                                                            %%%%%%%%%%%%%%%%%%%%%%%%% 
                                                                                                                             %%%%%%%%%%%%%%%%%%%%%%%  
                                                                                                                              %%%%%%%%%%%%%%%%%%%%    
             %                           %                                                                                        @%%%%%%%%%@         
            %%%%%@                   @%%%%%                                                                                                           
           %%%%%%%%%%%%@       @%%%%%%%%%%%%                                                                                                          
            @%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                                                                                                           
               %%%%%%%%%%%%%%%%%%%%%%%%%                                                                                                              
                  @%%%%%%%%%%%%%%%%%@                                                                                                                 `;

// Creating a nice border around the entire output
function createBorderedOutput(logo) {
    // Split the logo into lines and find the maximum length
    const lines = logo.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    
    // Border characters
    const topLeft = '╔';
    const topRight = '╗';
    const bottomLeft = '╚';
    const bottomRight = '╝';
    const horizontal = '═';
    const vertical = '║';
    
    // Create top border
    let output = topLeft + horizontal.repeat(maxLength + 2) + topRight + '\n';
    
    // Add the logo with vertical borders, preserving exact spacing
    lines.forEach(line => {
        // Make sure we maintain exact spacing in the original
        const padding = ' '.repeat(maxLength - line.length);
        output += vertical + ' ' + line + padding + ' ' + vertical + '\n';
    });
    
    // Create header and footer text
    const headerText = "Developed by aardig";
    const footerText = "www.aardig.amsterdam";
    
    // Add spacing line
    output += vertical + ' ' + ' '.repeat(maxLength) + ' ' + vertical + '\n';
    
    // Add header text centered
    const headerPaddingLeft = Math.floor((maxLength - headerText.length) / 2);
    const headerPaddingRight = maxLength - headerText.length - headerPaddingLeft;
    output += vertical + ' ' + ' '.repeat(headerPaddingLeft) + headerText + ' '.repeat(headerPaddingRight) + ' ' + vertical + '\n';
    
    // Add footer text centered
    const footerPaddingLeft = Math.floor((maxLength - footerText.length) / 2);
    const footerPaddingRight = maxLength - footerText.length - footerPaddingLeft;
    output += vertical + ' ' + ' '.repeat(footerPaddingLeft) + footerText + ' '.repeat(footerPaddingRight) + ' ' + vertical + '\n';
    
    // Create bottom border
    output += bottomLeft + horizontal.repeat(maxLength + 2) + bottomRight;
    
    return output;
}

// Display the bordered logo in console
// Using a monospace font is essential for proper display
console.log("%c" + createBorderedOutput(logo), "font-family: monospace; white-space: pre;");