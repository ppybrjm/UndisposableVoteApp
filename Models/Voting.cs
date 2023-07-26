namespace VotingAPI.Models {
    public class Voting {
        public int id { get; set; }

        public int voterId { get; set; }

        public int userId { get; set; }

        public char? vote {get; set; }
    }
}