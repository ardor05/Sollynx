use anchor_lang::prelude::*;

declare_id!("3Ef4zyoHbk5SYwoDkswzdNYuvFbYR7LBe6cA5UvxQHSL");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
